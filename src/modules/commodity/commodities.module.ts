import { Module } from '@nestjs/common';
import { CommoditiesController } from './commodities.controller';
import { CommoditiesService } from './commodities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Commodity, CommoditySchema } from './schemas/commodity.schema';
import { CommoditiesRepository } from './repository/commodities.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commodity.name, schema: CommoditySchema },
    ]),
  ],
  controllers: [CommoditiesController],
  providers: [CommoditiesService, CommoditiesRepository],
})
export class CommoditiesModule {}
