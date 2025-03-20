import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeTypeDto {
  @ApiProperty({ description: 'Operation code of the product' })
  @IsString()
  @IsNotEmpty()
  operationCode: string;

  @ApiProperty({ description: 'Local size type of the product' })
  @IsString()
  @IsNotEmpty()
  localSizetype: string;

  @ApiProperty({ description: 'ISO size type of the product' })
  @IsString()
  @IsNotEmpty()
  isoSizetype: string;

  @ApiProperty({ description: 'Cargo type code of the product' })
  @IsString()
  @IsNotEmpty()
  cargoTypeCode: string;

  @ApiProperty({ description: 'Empty cargo type code of the product' })
  @IsString()
  @IsNotEmpty()
  emptyCargoTypeCode: string;
}
