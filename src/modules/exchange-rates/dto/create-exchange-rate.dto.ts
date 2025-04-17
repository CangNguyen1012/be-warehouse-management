import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExchangeRateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currencyCode: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiProperty()
  @IsNotEmpty()
  dateOfRate: Date;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
