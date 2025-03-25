import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

@Controller('booking')
@ApiTags('Booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'fromDate',
    required: false,
    type: String,
    description: 'Start date in ISO format',
  })
  @ApiQuery({
    name: 'toDate',
    required: false,
    type: String,
    description: 'End date in ISO format',
  })
  @ApiQuery({
    name: 'bookingNo',
    required: false,
    type: String,
    description: 'Booking number',
  })
  @ApiQuery({
    name: 'operationCode',
    required: false,
    type: String,
    description: 'Operation code',
  })
  @ApiQuery({
    name: 'vesselKey',
    required: false,
    type: String,
    description: 'Vessel key',
  })
  @ApiQuery({
    name: 'pol',
    required: false,
    type: String,
    description: 'POL',
  })
  @ApiQuery({
    name: 'pod',
    required: false,
    type: String,
    description: 'POD',
  })
  @ApiQuery({
    name: 'fpod',
    required: false,
    type: String,
    description: 'Final POD',
  })
  @ApiQuery({
    name: 'bookingStatus',
    required: false,
    type: [Number],
    description: 'Booking status',
  })
  @ApiResponse({ status: 200, description: 'Bookings retrieved successfully' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit: number,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    @Query('operationCode') operationCode?: string,
    @Query('bookingNo') bookingNo?: string,
    @Query('vesselKey') vesselKey?: string,
    @Query('pol') pol?: string,
    @Query('pod') pod?: string,
    @Query('fpod') fpod?: string,
    @Query('bookingStatus') bookingStatus?: string,
  ) {
    const statusArray = bookingStatus
      ? bookingStatus
          .split(',')
          .map(Number)
          .filter((num) => !isNaN(num))
      : undefined;
    return this.bookingService.findAllBookings(
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
      statusArray,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async findOne(@Param('id') id: string) {
    return this.bookingService.findOneBooking(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking' })
  @ApiResponse({ status: 200, description: 'Booking updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async remove(@Param('id') id: string) {
    return this.bookingService.deleteBooking(id);
  }

  @Post('/cancel-booking/:id')
  @ApiOperation({ summary: 'Cancel a booking' })
  @ApiResponse({ status: 200, description: 'Booking canceled successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async cancel(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }
}
