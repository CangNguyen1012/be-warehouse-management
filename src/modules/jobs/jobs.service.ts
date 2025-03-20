import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/jobs.schema';
import { Model } from 'mongoose';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto) {
    const createdJob = new this.jobModel(createJobDto);
    return await createdJob.save();
  }

  async findAll(page: number = 1, limit: number) {
    const total = await this.jobModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.jobModel.find().skip(skip).limit(limit);

    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string) {
    return await this.jobModel.findById(id);
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    return await this.jobModel.findByIdAndUpdate(id, updateJobDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.jobModel.findByIdAndDelete(id);
  }
}
