import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  operationCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refName: string;

  @ApiProperty()
  @IsString()
  laneCode?: string;

  @ApiProperty()
  @IsString()
  vesselCode?: string;

  @ApiProperty()
  @IsString()
  customerCode?: string;

  @ApiProperty()
  @IsString()
  isLocalForeign?: string;

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
  classCode?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  pluginTime?: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  unplugTime?: Date;
}
