import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../schemas/booking.schema';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { UpdateBookingDto } from '../dtos/update-booking.dto';

@Injectable()
export class BookingRepository {
  private readonly logger = new Logger(BookingRepository.name);

  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    this.logger.log(
      `Creating a new booking: ${JSON.stringify(createBookingDto)}`,
    );
    const newBooking = new this.bookingModel(createBookingDto);
    return await newBooking.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: Booking[] }> {
    const total = await this.bookingModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.bookingModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<Booking | null> {
    return await this.bookingModel.findById(id).lean();
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking | null> {
    this.logger.log(`Updating booking ID: ${id}`);
    return await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, {
      new: true,
      lean: true,
    });
  }

  async delete(id: string): Promise<Booking | null> {
    this.logger.warn(`Deleting booking ID: ${id}`);
    return await this.bookingModel.findByIdAndDelete(id).lean();
  }

  async updateBookingStatus(
    id: string,
    status: number,
  ): Promise<Booking | null> {
    this.logger.log(`Updating booking status ID: ${id} to ${status}`);
    return await this.bookingModel.findByIdAndUpdate(
      id,
      { bookingStatus: status },
      { new: true, lean: true },
    );
  }
}
