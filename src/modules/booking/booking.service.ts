/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BookingRepository } from './repository/booking.repository';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { SizeTypesRepository } from '../products/repository/size-types.repository';
import { ContainerRepository } from '../containers/repository/containers.reposity';
import { Booking, BookingStatus } from './schemas/booking.schema';

@Injectable()
export class BookingService {
  private logger = new Logger(BookingService.name);

  constructor(
    private bookingRepository: BookingRepository,
    private sizeTypesRepository: SizeTypesRepository,
    private containerRepository: ContainerRepository,
  ) {}

  // Helper to calculate the booking status dynamically
  private calculateStatus(booking: Booking, currentDate: Date): number {
    // Step 1: Check if canceled
    if (booking.bookingStatus === BookingStatus.CANCELED) {
      return BookingStatus.CANCELED;
    }

    // Step 2: Check if expired
    if (
      currentDate > booking.expDate &&
      booking.stackingAmount < booking.bookingAmount
    ) {
      return BookingStatus.EXPIRED;
    }

    // Step 3: Check if fully allocated
    if (booking.stackingAmount === booking.bookingAmount) {
      return BookingStatus.FULLY_ALLOCATED;
    }

    // Step 4: Check if in progress of allocation
    if (
      booking.stackingAmount > 0 &&
      booking.stackingAmount < booking.bookingAmount &&
      currentDate <= booking.expDate
    ) {
      return BookingStatus.IN_PROGRESS_OF_ALLOCATION;
    }

    // Step 5: Default to Not Yet Allocated
    if (booking.stackingAmount === 0 && currentDate <= booking.expDate) {
      return BookingStatus.NOT_YET_ALLOCATED;
    }

    // Fallback (shouldn't reach here if logic is complete)
    return BookingStatus.EXPIRED;
  }

  async createBooking(createBookingDto: CreateBookingDto) {
    const { operationCode, isoSizetype } = createBookingDto;

    const sizeTypes =
      await this.sizeTypesRepository.findByOperationCode(operationCode);
    if (!sizeTypes.length) {
      throw new NotFoundException(
        `Size types not found for operation code: ${operationCode}`,
      );
    }

    const availableContainers =
      await this.containerRepository.findByOperationCodeAndIsoSizetype(
        operationCode,
        isoSizetype,
      );

    if (!availableContainers.length) {
      throw new NotFoundException(
        `Containers not found for operation code: ${operationCode} and iso sizetype: ${isoSizetype}`,
      );
    }

    const newBooking = await this.bookingRepository.create(createBookingDto);
    // Calculate initial status
    const currentDate = new Date();
    newBooking.bookingStatus = this.calculateStatus(newBooking, currentDate);
    return newBooking;
  }

  async findAllBookings(
    page: number = 1,
    limit: number,
    fromDate?: string,
    toDate?: string,
    operationCode?: string,
    bookingNo?: string,
    vesselKey?: string,
    pol?: string,
    pod?: string,
    fpod?: string,
    bookingStatus?: number[],
  ) {
    const { total, results } = await this.bookingRepository.findAll(
      page,
      limit,
      fromDate,
      toDate,
      operationCode,
      bookingNo,
      vesselKey,
      pol,
      pod,
      fpod,
      bookingStatus,
    );

    // Calculate status for each booking dynamically
    const currentDate = new Date();
    const updatedResults = results.map((booking) => {
      booking.bookingStatus = this.calculateStatus(booking, currentDate);
      return booking;
    });

    return {
      statusCode: 200,
      data: { page, limit: total, total, results: updatedResults },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneBooking(id: string) {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      this.logger.warn(`Booking not found with ID: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
    }

    // Calculate status dynamically
    const currentDate = new Date();
    booking.bookingStatus = this.calculateStatus(booking, currentDate);
    return booking;
  }

  async updateBooking(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      const booking = await this.bookingRepository.findById(id);
      if (!booking) {
        this.logger.warn(`Booking not found with ID: ${id}`);
        throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
      }

      const currentDate = new Date();

      // If expDate is being updated and is different from the current expDate, apply validation
      if (
        updateBookingDto.expDate !== undefined &&
        new Date(updateBookingDto.expDate).toISOString() !==
          booking.expDate.toISOString()
      ) {
        const newExpDate = new Date(updateBookingDto.expDate);

        // Validate: Cannot update expDate if booking is canceled
        if (booking.bookingStatus === BookingStatus.CANCELED) {
          throw new BadRequestException(
            'Cannot update expiration date: Booking is canceled',
          );
        }

        // Validate: New expDate must be in the future
        if (newExpDate <= currentDate) {
          throw new BadRequestException(
            'New expiration date must be in the future',
          );
        }

        // Log the expDate change
        this.logger.log(
          `Booking ${id}: Updating expDate from ${booking.expDate.toISOString()} to ${newExpDate.toISOString()} on ${currentDate.toISOString()}`,
        );
      }

      // Update the booking
      const updatedBooking = await this.bookingRepository.update(
        id,
        updateBookingDto,
      );
      if (!updatedBooking) {
        this.logger.warn(`Update failed - Booking ID not found: ${id}`);
        throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
      }

      // Recalculate status after update
      updatedBooking.bookingStatus = this.calculateStatus(
        updatedBooking,
        currentDate,
      );
      return updatedBooking;
    } catch (error) {
      this.logger.error(
        `Update failed for booking ID: ${id} - ${error.message}`,
      );
      throw error;
    }
  }

  async deleteBooking(id: string) {
    try {
      return await this.bookingRepository.delete(id);
    } catch {
      this.logger.warn(`Delete failed - Booking ID not found: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
    }
  }

  async cancelBooking(id: string) {
    try {
      const booking = await this.bookingRepository.findById(id);
      if (!booking) {
        throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
      }
      return await this.bookingRepository.updateBookingStatus(
        id,
        BookingStatus.CANCELED,
      );
    } catch {
      this.logger.warn(`Cancel failed - Booking not found with ID: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
    }
  }
}
