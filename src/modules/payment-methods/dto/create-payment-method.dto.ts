import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sort: number;

  @ApiProperty()
  terminalCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partnerCode: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty()
  type: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  minAmount: number;
}
