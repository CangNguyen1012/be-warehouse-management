import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'en', description: 'Language code' })
  @IsNotEmpty()
  @IsString()
  languageCode: string;

  @ApiProperty({ example: 'English', description: 'Language name' })
  @IsNotEmpty()
  @IsString()
  languageName: string;
}
