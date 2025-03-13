import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommodityDto {
  @ApiProperty({ description: 'The code of the commodity' })
  @IsString()
  @IsNotEmpty()
  commodityCode: string;

  @ApiProperty({ description: 'The name of the commodity' })
  @IsString()
  @IsNotEmpty()
  commodityName: string;
}
