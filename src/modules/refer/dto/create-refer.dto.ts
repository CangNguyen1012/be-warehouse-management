import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReferDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  operationCode: string;

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
}
