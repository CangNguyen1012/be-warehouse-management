import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CancelBookingDto {
  @ApiProperty({
    example: '6604a5e8f4d3e2a5c8b7f2d9',
    description: 'Booking id',
  })
  @IsNotEmpty()
  @IsMongoId()
  bookingId: string;
}
