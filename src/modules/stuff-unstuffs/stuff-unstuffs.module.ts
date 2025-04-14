import { Module } from '@nestjs/common';
import { StuffUnstuffsService } from './stuff-unstuffs.service';
import { StuffUnstuffsController } from './stuff-unstuffs.controller';
import { StuffUnstuffsRepository } from './repository/stuff-unstuff.repository';
import { MongooseModule } from '@nestjs/mongoose';
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
  providers: [StuffUnstuffsService, StuffUnstuffsRepository],
  controllers: [StuffUnstuffsController],
})
export class StuffUnstuffsModule {}
