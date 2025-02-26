import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommodityDto {
  @IsString()
  @IsNotEmpty()
  readonly commodityCode: string;

  @IsString()
  @IsNotEmpty()
  readonly commodityName: string;

  @IsString()
  @IsNotEmpty()
  readonly modifiedBy: string;
}
