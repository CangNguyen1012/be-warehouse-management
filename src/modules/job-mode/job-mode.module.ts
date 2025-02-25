import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobMode, JobModeSchema } from './schemas/job-mode.schema';
import { JobModeController } from './job-mode.controller';
import { JobModeService } from './job-mode.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: JobMode.name, schema: JobModeSchema }]),
  ],
  controllers: [JobModeController],
  providers: [JobModeService],
})
export class JobModeModule {}
