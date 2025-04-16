import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTerminalDto {
  @ApiPropertyOptional()
  @IsBoolean()
  importPickupAllCont: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  depotSelect: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  holidaySelect: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  terminalName: string;

  @ApiPropertyOptional()
  @IsBoolean()
  autoActiveUser: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  terminalNameEng: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  shortTerminalName: string;

  @ApiPropertyOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  vat: string;

  @ApiPropertyOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  tel: string;

  @ApiPropertyOptional()
  @IsString()
  fax: string;

  @ApiPropertyOptional()
  @IsString()
  web: string;

  @ApiPropertyOptional()
  @IsString()
  hotlineInfo: string;
}
