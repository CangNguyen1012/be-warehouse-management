import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateJobModeMappingDto {
  @ApiPropertyOptional()
  @IsString()
  jobModeCode?: string;

  @ApiPropertyOptional()
  @IsString()
  classCode?: string;

  @ApiPropertyOptional()
  @IsString()
  classCodeMapping?: string;

  @ApiPropertyOptional()
  @IsString()
  jobModeCodeMapping?: string;
}
