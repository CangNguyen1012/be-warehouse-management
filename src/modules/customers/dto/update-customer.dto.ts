import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  customerTypeCode: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  customerCode: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  taxcode: string;

  @ApiPropertyOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  represent: string;

  @ApiPropertyOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  moneyCredit: string;

  @ApiPropertyOptional()
  operationCode: string;

  @ApiPropertyOptional()
  customerLevelCode: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  languageCode: string;

  @ApiPropertyOptional()
  @IsNumber()
  isPosted: number;
}
