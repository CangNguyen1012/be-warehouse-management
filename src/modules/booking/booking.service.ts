/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './repository/booking.repository';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

@Injectable()
export class BookingService {
  private logger = new Logger(BookingService.name);

  constructor(private bookingRepository: BookingRepository) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    return await this.bookingRepository.create(createBookingDto);
  }

  async findAllBookings(page: number = 1, limit: number) {
    const { total, results } = await this.bookingRepository.findAll(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data: { page, limit, total, results },
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
    } catch (error) {
      this.logger.warn(`Update failed - Booking ID not found: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
    }
  }

  async deleteBooking(id: string) {
    try {
      return await this.bookingRepository.delete(id);
    } catch (error) {
      this.logger.warn(`Delete failed - Booking ID not found: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
    }
  }

  async cancelBooking(id: string) {
    try {
      return await this.bookingRepository.updateBookingStatus(id, 4);
    } catch (error) {
      this.logger.warn(`Cancel failed - Booking not found with ID: ${id}`);
      throw new NotFoundException(`Không tìm thấy booking với ID: ${id}`);
    }
  }
}
