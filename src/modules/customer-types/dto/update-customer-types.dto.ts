import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCustomerTypeDto {
  @IsString()
  @IsNotEmpty()
  readonly customerTypeCode: string;

  @IsString()
  @IsNotEmpty()
  readonly customerTypeName: string;

  @IsNumber()
  @IsOptional()
  readonly userGroupRank?: number;

  @IsString()
  @IsNotEmpty()
  readonly createdBy: string;
}
