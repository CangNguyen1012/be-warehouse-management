import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingRepository } from './repository/booking.repository';
import { SizeTypesModule } from '../products/size-types.module';
import { ContainersModule } from '../containers/containers.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    SizeTypesModule,
    ContainersModule,
    ScheduleModule.forRoot(),
  ],
  providers: [BookingService, BookingRepository],
  controllers: [BookingController],
})
export class BookingModule {}
