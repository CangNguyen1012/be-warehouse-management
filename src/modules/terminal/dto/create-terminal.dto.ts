import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTerminalDto {
  @ApiProperty()
  @IsBoolean()
  importPickupAllCont: boolean;

  @ApiProperty()
  @IsBoolean()
  depotSelect: boolean;

  @ApiProperty()
  @IsBoolean()
  holidaySelect: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  terminalName: string;

  @ApiProperty()
  @IsBoolean()
  autoActiveUser: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  terminalNameEng: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shortTerminalName: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  vat: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  tel: string;

  @ApiProperty()
  @IsString()
  fax: string;

  @ApiProperty()
  @IsString()
  web: string;

  @ApiProperty()
  @IsString()
  hotlineInfo: string;
}
