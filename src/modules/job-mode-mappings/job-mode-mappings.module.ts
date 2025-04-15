import { Module } from '@nestjs/common';
import { JobModeMappingsService } from './job-mode-mappings.service';
import { JobModeMappingsController } from './job-mode-mappings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobModeMapping,
  JobModeMappingSchema,
} from './schemas/job-mode-mapping.schema';
import { JobModeMappingsRepository } from './repository/job-mode-mappings.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobModeMapping.name, schema: JobModeMappingSchema },
    ]),
  ],
  providers: [JobModeMappingsService, JobModeMappingsRepository],
  controllers: [JobModeMappingsController],
})
export class JobModeMappingsModule {}
