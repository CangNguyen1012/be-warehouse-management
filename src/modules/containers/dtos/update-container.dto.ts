import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateContainerDto {
  @ApiProperty({ description: 'Vessel Key' })
  @IsString()
  @IsNotEmpty()
  vesselKey: string;

  @ApiProperty({ description: 'Container No' })
  @IsString()
  @IsNotEmpty()
  containerNo: string;

  @ApiProperty({ description: 'Class Code' })
  @IsString()
  @IsNotEmpty()
  classCode: string;

  @ApiProperty({ description: 'Operation Code' })
  @IsString()
  @IsNotEmpty()
  operationCode: string;

  @ApiProperty({ description: 'FE' })
  @IsString()
  @IsNotEmpty()
  fe: string;

  @ApiProperty({ description: 'Container Status Code' })
  @IsString()
  @IsNotEmpty()
  containerStatusCode: string;

  @ApiProperty({ description: 'Cargo Type Code' })
  @IsString()
  @IsNotEmpty()
  cargoTypeCode: string;

  @ApiProperty({ description: 'Local Size Type' })
  @IsString()
  @IsNotEmpty()
  localSizetype: string;

  @ApiProperty({ description: 'ISO Size Type' })
  @IsString()
  @IsNotEmpty()
  isoSizetype: string;

  @ApiProperty({ description: 'Local Foreign' })
  @IsString()
  @IsNotEmpty()
  isLocalForeign: string;

  @ApiProperty({ description: 'Block' })
  @IsString()
  @IsOptional()
  block?: string;

  @ApiProperty({ description: 'Bay' })
  @IsString()
  @IsOptional()
  bay?: string;

  @ApiProperty({ description: 'Row' })
  @IsString()
  @IsOptional()
  row?: string;

  @ApiProperty({ description: 'Tier' })
  @IsString()
  @IsOptional()
  tier?: string;
}
