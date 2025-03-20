import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ description: 'Job code' })
  @IsString()
  @IsNotEmpty()
  jobCode: string;

  @ApiProperty({ description: 'Job name' })
  @IsString()
  @IsNotEmpty()
  jobName: string;

  @ApiProperty({ description: 'Is quay' })
  @IsBoolean()
  @IsNotEmpty()
  isQuay: boolean;

  @ApiProperty({ description: 'Is yard' })
  @IsBoolean()
  @IsNotEmpty()
  isYard: boolean;

  @ApiProperty({ description: 'Is gate' })
  @IsBoolean()
  @IsNotEmpty()
  isGate: boolean;
}
