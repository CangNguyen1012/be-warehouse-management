import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  readonly countryCode: string;

  @IsString()
  @IsNotEmpty()
  readonly countryName: string;

  @IsString()
  @IsNotEmpty()
  readonly taxID: string;
}
