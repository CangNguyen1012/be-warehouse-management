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
    const newJobMode = new this.jobModeModel(dto);
    return newJobMode.save();
  }

  async findAll(page: number, limit: number) {
    const total = await this.jobModeModel.countDocuments();
    const results = await this.jobModeModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return { page, limit, total, results };
  }

  async findOne(id: string): Promise<JobMode> {
    const jobMode = await this.jobModeModel.findById(id);
    if (!jobMode) throw new NotFoundException('Job Mode not found');
    return jobMode;
  }

  async update(id: string, dto: UpdateJobModeDto): Promise<JobMode> {
    const updated = await this.jobModeModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Job Mode not found');
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.jobModeModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Job Mode not found');
    return { message: 'Deleted successfully' };
  }
}
