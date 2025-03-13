import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStuffUnstuffDto {
  @ApiProperty({ description: 'Job mode code' })
  @IsString()
  @IsNotEmpty()
  readonly jobModeCode: string;

  @ApiProperty({ description: 'Commodity code' })
  @IsString()
  @IsNotEmpty()
  readonly commodityCode: string;
}
