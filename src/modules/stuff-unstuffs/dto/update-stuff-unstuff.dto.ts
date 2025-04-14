import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateStuffUnstuffDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  jobModeCode: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  commodityCode: string;
}
