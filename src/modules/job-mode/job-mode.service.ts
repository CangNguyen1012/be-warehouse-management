import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobMode, JobModeDocument } from './schemas/job-mode.schema';
import { CreateJobModeDto } from './dto/create-job-mode.dto';
import { UpdateJobModeDto } from './dto/update-job-mode.dto';

@Injectable()
export class JobModeService {
  constructor(
    @InjectModel(JobMode.name) private jobModeModel: Model<JobModeDocument>,
  ) {}

  async create(dto: CreateJobModeDto): Promise<JobMode> {
    return this.jobModeModel.create(dto);
  }

  async findAll(page = 1, limit = 10) {
    const total = await this.jobModeModel.countDocuments();
    const results = await this.jobModeModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    return {
      statusCode: 200,
      data: {
        page,
        limit,
        total,
        results,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string): Promise<JobMode> {
    const jobMode = await this.jobModeModel.findById(id).lean().exec();
    if (!jobMode)
      throw new NotFoundException(`Job Mode with ID ${id} not found`);
    return jobMode;
  }

  async update(id: string, dto: UpdateJobModeDto): Promise<JobMode> {
    const updated = await this.jobModeModel
      .findByIdAndUpdate(id, dto, {
        new: true,
        lean: true,
      })
      .exec();

    if (!updated)
      throw new NotFoundException(`Job Mode with ID ${id} not found`);
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.jobModeModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Job Mode not found');
    return { message: 'Deleted successfully' };
  }
}
