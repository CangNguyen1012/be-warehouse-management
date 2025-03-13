import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerTypeDto {
  @ApiProperty({ description: 'The code of the customer type' })
  @IsString()
  @IsNotEmpty()
  customerTypeCode: string;

  @ApiProperty({ description: 'The name of the customer type' })
  @IsString()
  @IsNotEmpty()
  customerTypeName: string;

  @ApiPropertyOptional({ description: 'The rank of the user group' })
  @IsNumber()
  @IsOptional()
  userGroupRank?: number;
}
