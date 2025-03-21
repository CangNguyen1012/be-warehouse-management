import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  operationCode: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  applyDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  expireDate: Date;

  @ApiProperty()
  @IsString()
  rounding: string;

  @ApiProperty()
  @IsString()
  moneyCredit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  hourAdding: number;
}
