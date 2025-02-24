import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCountryDto {
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
