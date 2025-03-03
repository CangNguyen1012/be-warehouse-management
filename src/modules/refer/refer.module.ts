import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferController } from './refer.controller';
import { ReferService } from './refer.service';
import { Refer, ReferSchema } from './schemas/refer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Refer.name, schema: ReferSchema }]),
  ],
  controllers: [ReferController],
  providers: [ReferService],
})
export class ReferModule {}
