import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CustomerDto {
  @ApiProperty()
  @IsString()
  customerTypeCode: string;

  @ApiProperty()
  @IsString()
  customerTypeName: string;

  @ApiProperty()
  @IsNumber()
  userGroupRank: number;

  @ApiProperty()
  @IsString()
  createdBy: string;

  @ApiProperty()
  @IsDateString()
  createdTime: string;

  @ApiProperty()
  @IsString()
  modifiedBy: string;

  @ApiProperty()
  @IsDateString()
  modifiedTime: string;
}
