import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateImoDto {
  @ApiProperty({ description: 'IMDG class' })
  @IsString()
  @IsNotEmpty()
  imdgClass: string;

  @ApiProperty({ description: 'UN number' })
  @IsString()
  @IsNotEmpty()
  un: string;

  @ApiProperty({ description: 'Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Placard' })
  @IsString()
  @IsNotEmpty()
  placard: string;
}
