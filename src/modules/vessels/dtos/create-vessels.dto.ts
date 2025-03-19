import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVesselDto {
  @ApiProperty({ description: 'Terminal ID' })
  @IsString()
  @IsNotEmpty()
  terminalId: string;

  @ApiProperty({ description: 'Vessel Type' })
  @IsString()
  @IsNotEmpty()
  vesselType: string;

  @ApiProperty({ description: 'Vessel Code' })
  @IsString()
  @IsNotEmpty()
  vesselCode: string;

  @ApiProperty({ description: 'Vessel Name' })
  @IsString()
  @IsNotEmpty()
  vesselName: string;

  @ApiProperty({ description: 'Call Sign' })
  @IsString()
  @IsNotEmpty()
  callSign: string;

  @ApiProperty({ description: 'IMO' })
  @IsString()
  imo: string;
}
