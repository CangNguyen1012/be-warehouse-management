import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommodityDto {
  @IsString()
  @IsNotEmpty()
  readonly commodityCode: string;

  @IsString()
  @IsNotEmpty()
  readonly commodityName: string;

  @IsString()
  @IsNotEmpty()
  readonly createdBy: string;
}
