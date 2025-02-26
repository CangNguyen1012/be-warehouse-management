import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StuffUnstuffController } from './stuff-unstuff.controller';
import { StuffUnstuffService } from './stuff-unstuff.service';
import {
  StuffUnstuff,
  StuffUnstuffSchema,
} from './schemas/stuff-unstuff.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StuffUnstuff.name, schema: StuffUnstuffSchema },
    ]),
  ],
  controllers: [StuffUnstuffController],
  providers: [StuffUnstuffService],
})
export class StuffUnstuffModule {}
