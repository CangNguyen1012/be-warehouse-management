import { Module } from '@nestjs/common';
import { VesselsService } from './vessels.service';
import { VesselsController } from './vessels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vessel, VesselSchema } from './schemas/vessels.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vessel.name, schema: VesselSchema }]),
  ],
  providers: [VesselsService],
  controllers: [VesselsController],
})
export class VesselsModule {}
