import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExchangeRateDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  currencyCode: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  dateOfRate: Date;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
