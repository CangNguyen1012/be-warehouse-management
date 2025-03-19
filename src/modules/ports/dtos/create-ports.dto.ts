import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortDto {
  @ApiProperty({ description: 'Port Code' })
  @IsString()
  @IsNotEmpty()
  portCode: string;

  @ApiProperty({ description: 'Port Name' })
  @IsString()
  @IsNotEmpty()
  portName: string;
}
