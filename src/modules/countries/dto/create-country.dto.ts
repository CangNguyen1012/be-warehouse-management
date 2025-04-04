import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({
    description: 'Unique code representing the country',
    example: 'VN',
  })
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @ApiProperty({
    description: 'Official name of the country',
    example: 'Vietnam',
  })
  @IsString()
  @IsNotEmpty()
  countryName: string;

  @ApiProperty({
    description: 'Tax Identification Number for the country',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  taxID: string;
}
