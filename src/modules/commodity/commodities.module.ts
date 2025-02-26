import { Module } from '@nestjs/common';
import { CommoditiesController } from './commodities.controller';
import { CommoditiesService } from './commodities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Commodity, CommoditySchema } from './schemas/commodity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commodity.name, schema: CommoditySchema },
    ]),
  ],
  controllers: [CommoditiesController],
  providers: [CommoditiesService],
})
export class CommoditiesModule {}
