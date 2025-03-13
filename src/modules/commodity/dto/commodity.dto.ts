import { ApiProperty } from '@nestjs/swagger';

export class CommodityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  commodityCode: string;

  @ApiProperty()
  commodityName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
