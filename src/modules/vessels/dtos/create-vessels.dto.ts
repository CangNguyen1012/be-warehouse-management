import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVesselDto {
  @ApiProperty({ description: 'Operation Code' })
  @IsString()
  @IsNotEmpty()
  operationCode: string;

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
  callSign: string;

  @ApiProperty({ description: 'IMO' })
  @IsString()
  imo: string;
}
