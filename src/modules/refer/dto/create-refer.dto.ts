import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReferDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  operationCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  laneCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vesselCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  isLocalForeign?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  applyDate: Date; // Will be converted to UTC -7 in schema

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  expireDate: Date; // Will be converted to UTC -7 in schema

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  classCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  pluginTime?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  unplugTime?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rounding: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  moneyCredit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  hourAdding: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdTime?: Date;
}
