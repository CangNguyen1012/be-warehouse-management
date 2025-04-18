import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  sort?: number;

  @ApiPropertyOptional()
  terminalCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  partnerCode?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;

  @ApiPropertyOptional()
  type?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  minAmount?: number;
}
