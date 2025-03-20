import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookindDocument, Booking } from './schemas/booking.schema';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookindDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async findAll(page: number = 1, limit: number) {
    const total = await this.bookingModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.bookingModel.find().skip(skip).limit(limit);

    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string) {
    return await this.bookingModel.findById(id);
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    return await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.bookingModel.findByIdAndDelete(id);
  }
}
