import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  classCode: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  className: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  classMappingCode: string;
}
