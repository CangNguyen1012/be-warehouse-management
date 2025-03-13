import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateJobModeDto {
  @ApiProperty({ description: 'The code of the job mode' })
  @IsString()
  @IsNotEmpty()
  jobModeCode: string;

  @ApiProperty({ description: 'The name of the job mode' })
  @IsString()
  @IsNotEmpty()
  jobModeName: string;

  @ApiPropertyOptional({ description: 'Indicates if the job mode is LoLo' })
  @IsBoolean()
  @IsOptional()
  isLoLo?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates if the job mode is CFS Stuff',
  })
  @IsBoolean()
  @IsOptional()
  isCfsStuff?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates if the job mode is CFS Unstuff',
  })
  @IsBoolean()
  @IsOptional()
  isCfsUnstuff?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates if the job mode is Service Yard',
  })
  @IsBoolean()
  @IsOptional()
  isServiceYard?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates if the job mode is Service Noncont',
  })
  @IsBoolean()
  @IsOptional()
  isServiceNoncont?: boolean;

  @ApiPropertyOptional({ description: 'Extra mode value' })
  @IsOptional()
  extraMode?: number;
}
