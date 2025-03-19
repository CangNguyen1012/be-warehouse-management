import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateOperationDto {
  @ApiProperty({ description: 'Code of the operation' })
  @IsString()
  @IsNotEmpty()
  operationCode: string;

  @ApiProperty({ description: 'Name of the operation' })
  @IsString()
  @IsNotEmpty()
  operationName: string;

  @ApiPropertyOptional({ description: 'Indicates if the operation is EDO' })
  @IsBoolean()
  @IsOptional()
  isEdo?: boolean;

  @ApiPropertyOptional({ description: 'Indicates if the operation is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Note for EDO operations' })
  @IsBoolean()
  @IsOptional()
  edoNote?: boolean;

  @ApiPropertyOptional({ description: 'Local or foreign operation indication' })
  @IsString()
  @IsOptional()
  isLocalForeign?: string;

  @ApiPropertyOptional({ description: 'Credit associated with the operation' })
  @IsString()
  @IsOptional()
  moneyCredit?: string;
}
