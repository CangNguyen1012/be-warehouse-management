import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './repository/booking.repository';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { SizeTypesRepository } from '../products/repository/size-types.repository';
import { ContainerRepository } from '../containers/repository/containers.reposity';

@Injectable()
export class BookingService {
  private logger = new Logger(BookingService.name);

  constructor(
    private bookingRepository: BookingRepository,
    private sizeTypesRepository: SizeTypesRepository,
    private containerRepository: ContainerRepository,
  ) {}

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

    return await this.bookingRepository.create(createBookingDto);
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
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneBooking(id: string) {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      this.logger.warn(`Booking not found with ID: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
    }
    return booking;
  }

  async updateBooking(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      return await this.bookingRepository.update(id, updateBookingDto);
    } catch {
      this.logger.warn(`Update failed - Booking ID not found: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
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
      return await this.bookingRepository.updateBookingStatus(id, 4);
    } catch {
      this.logger.warn(`Cancel failed - Booking not found with ID: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
    }
  }
}
