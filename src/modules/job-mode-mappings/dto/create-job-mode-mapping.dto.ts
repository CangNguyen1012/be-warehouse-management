import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobModeMappingDto {
  @ApiProperty({ description: 'The code of the job mode' })
  @IsString()
  @IsNotEmpty()
  jobModeCode: string;

  @ApiPropertyOptional({ description: 'The code of the class' })
  @IsString()
  classCode?: string;

  @ApiProperty({ description: 'The code of the class' })
  @IsString()
  @IsNotEmpty()
  classCodeMapping: string;

  @ApiProperty({ description: 'The code of the job mode' })
  @IsString()
  @IsNotEmpty()
  jobModeCodeMapping: string;
}
