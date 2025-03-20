import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class UpdateBookingDto {
  @ApiProperty({ description: 'Booking ID' })
  @IsString()
  @IsNotEmpty()
  bookingNo: string;

  @ApiProperty({ description: 'Booking Date' })
  @IsNotEmpty()
  @Type(() => Date) // Chuyển đổi string -> Date
  @IsDate()
  bookingDate: Date;

  @ApiProperty({ description: 'Booking Type' })
  @IsNumber()
  @IsNotEmpty()
  bookingType: number;

  @ApiProperty({ description: 'Booking Status' })
  @IsNumber()
  @IsNotEmpty()
  bookingStatus: number;

  @ApiProperty({ description: 'Expired Date' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  expDate: Date;

  @ApiProperty({ description: 'Operation Code' })
  @IsString()
  @IsNotEmpty()
  operationCode: string;

  @ApiProperty({ description: 'Operation local size type' })
  @IsString()
  @IsNotEmpty()
  localSizeType: string;

  @ApiProperty({ description: 'Operation ISO size type' })
  @IsString()
  @IsNotEmpty()
  isoSizeType: string;

  @ApiProperty({ description: 'Booking amount' })
  @IsNumber()
  @IsNotEmpty()
  bookingAmount: number;

  @ApiProperty({ description: 'Stacking amount' })
  @IsNumber()
  @IsNotEmpty()
  stackingAmount: number;

  @ApiProperty({ description: 'Container number' })
  @IsString()
  @IsNotEmpty()
  containerNo: string;

  @ApiPropertyOptional({ description: 'Vessel Key' })
  @IsString()
  @IsOptional()
  vesselKey?: string;

  @ApiPropertyOptional({ description: 'Vessel Import' })
  @IsString()
  @IsOptional()
  vesselImvoy?: string;

  @ApiPropertyOptional({ description: 'Vessel Export' })
  @IsString()
  @IsOptional()
  vesselExvoy?: string;

  @ApiPropertyOptional({ description: 'Port of Loading' })
  @IsString()
  @IsOptional()
  pol?: string;

  @ApiPropertyOptional({ description: 'Port of Discharge' })
  @IsString()
  @IsOptional()
  pod?: string;

  @ApiPropertyOptional({ description: 'Final Port of Discharge' })
  @IsString()
  @IsOptional()
  fpod?: string;

  @ApiPropertyOptional({ description: 'Commodity' })
  @IsString()
  @IsOptional()
  commodity?: string;

  @ApiPropertyOptional({ description: 'Temperature' })
  @IsNumber()
  @IsOptional()
  temperature?: number;

  @ApiPropertyOptional({ description: 'Vent' })
  @IsNumber()
  @IsOptional()
  vent?: number;

  @ApiPropertyOptional({ description: 'Vent Unit' })
  @IsString()
  @IsOptional()
  ventUnit?: string;

  @ApiPropertyOptional({ description: 'Booking Class' })
  @IsString()
  @IsOptional()
  bookingClass?: string;

  @ApiPropertyOptional({ description: 'UNNO' })
  @IsString()
  @IsOptional()
  unno?: string;

  @ApiPropertyOptional({ description: 'OOG Top' })
  @IsString()
  @IsOptional()
  oogTop?: string;

  @ApiPropertyOptional({ description: 'OOG Left' })
  @IsString()
  @IsOptional()
  oogLeft?: string;

  @ApiPropertyOptional({ description: 'OOG Right' })
  @IsString()
  @IsOptional()
  oogRight?: string;

  @ApiPropertyOptional({ description: 'OOG Back' })
  @IsString()
  @IsOptional()
  oogBack?: string;

  @ApiPropertyOptional({ description: 'OOG Front' })
  @IsString()
  @IsOptional()
  oogFront?: string;

  @ApiPropertyOptional({ description: 'Oxygen' })
  @IsString()
  @IsOptional()
  o2?: string;

  @ApiPropertyOptional({ description: 'Carbon Dioxide' })
  @IsString()
  @IsOptional()
  co2?: string;

  @ApiPropertyOptional({ description: 'Booking Note' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'Vessel Name' })
  @IsString()
  @IsNotEmpty()
  vesselName: string;

  @ApiPropertyOptional({ description: 'Shipper Name' })
  @IsString()
  @IsOptional()
  shipperName?: string;

  @ApiPropertyOptional({ description: 'Humidity' })
  @IsString()
  @IsOptional()
  humidity?: string;

  @ApiProperty({ description: 'User Group Rank' })
  @IsNumber()
  @IsOptional()
  userGroupRank?: number;

  @ApiProperty({ description: 'Type' })
  @IsNumber()
  @IsOptional()
  type?: number;
}
