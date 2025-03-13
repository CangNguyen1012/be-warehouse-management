import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerTypeDto {
  @ApiProperty({ description: 'Code of the customer type' })
  @IsString()
  @IsNotEmpty()
  customerTypeCode: string;

  @ApiProperty({ description: 'Name of the customer type' })
  @IsString()
  @IsNotEmpty()
  customerTypeName: string;

  @ApiPropertyOptional({ description: 'Rank of the user group' })
  @IsNumber()
  @IsOptional()
  userGroupRank?: number;
}
