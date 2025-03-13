import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobModeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobModeCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobModeName: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isLoLo?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isCfsStuff?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isCfsUnstuff?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isServiceYard?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isServiceNoncont?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  extraMode?: number;
}
