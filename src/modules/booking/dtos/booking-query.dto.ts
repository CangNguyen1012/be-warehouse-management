import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsArray } from 'class-validator';

export class BookingQueryDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'Page number (default: 1)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @ApiPropertyOptional({ type: Number, description: 'Results per page' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Start date in ISO format',
  })
  @IsOptional()
  @IsString()
  fromDate?: string;

  @ApiPropertyOptional({ type: String, description: 'End date in ISO format' })
  @IsOptional()
  @IsString()
  toDate?: string;

  @ApiPropertyOptional({ type: String, description: 'Booking number' })
  @IsOptional()
  @IsString()
  bookingNo?: string;

  @ApiPropertyOptional({ type: String, description: 'Operation code' })
  @IsOptional()
  @IsString()
  operationCode?: string;

  @ApiPropertyOptional({ type: String, description: 'Vessel key' })
  @IsOptional()
  @IsString()
  vesselKey?: string;

  @ApiPropertyOptional({ type: String, description: 'Port of Loading (POL)' })
  @IsOptional()
  @IsString()
  pol?: string;

  @ApiPropertyOptional({ type: String, description: 'Port of Discharge (POD)' })
  @IsOptional()
  @IsString()
  pod?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Final Port of Discharge (FPOD)',
  })
  @IsOptional()
  @IsString()
  fpod?: string;

  @ApiPropertyOptional({
    type: [Number],
    description: 'Booking status (comma-separated)',
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  bookingStatus?: number[];
}
