import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateJobDto {
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
