import { IsInt, IsOptional, Min } from 'class-validator';

export class ListCommodityDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
