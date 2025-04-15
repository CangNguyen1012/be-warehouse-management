import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  JobModeMapping,
  JobModeMappingDocument,
} from '../schemas/job-mode-mapping.schema';
import { Model } from 'mongoose';
import { CreateJobModeMappingDto } from '../dto/create-job-mode-mapping.dto';
import { UpdateJobModeMappingDto } from '../dto/update-job-mode-mapping.dto';

@Injectable()
export class JobModeMappingsRepository {
  private readonly logger = new Logger(JobModeMappingsRepository.name);

  constructor(
    @InjectModel(JobModeMapping.name)
    private jobModeMappingModel: Model<JobModeMappingDocument>,
  ) {}

  async create(
    createJobModeMappingDto: CreateJobModeMappingDto,
  ): Promise<JobModeMapping> {
    this.logger.log(
      `Creating a new job mode mapping: ${JSON.stringify(
        createJobModeMappingDto,
      )}`,
    );
    const newJobModeMapping = new this.jobModeMappingModel(
      createJobModeMappingDto,
    );
    return await newJobModeMapping.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: JobModeMapping[] }> {
    this.logger.log(`Finding all job mode mappings`);
    const total = await this.jobModeMappingModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.jobModeMappingModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<JobModeMapping | null> {
    this.logger.log(`Finding job mode mapping ID: ${id}`);
    return await this.jobModeMappingModel.findById(id).lean();
  }

  async update(
    id: string,
    updateJobModeMappingDto: UpdateJobModeMappingDto,
  ): Promise<JobModeMapping | null> {
    this.logger.log(`Updating job mode mapping ID: ${id}`);
    return await this.jobModeMappingModel.findByIdAndUpdate(
      id,
      updateJobModeMappingDto,
      {
        new: true,
        lean: true,
      },
    );
  }

  async delete(id: string): Promise<JobModeMapping | null> {
    this.logger.warn(`Deleting job mode mapping ID: ${id}`);
    return await this.jobModeMappingModel.findByIdAndDelete(id).lean();
  }
}
