import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStuffUnstuffDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobModeCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  commodityCode: string;
}
