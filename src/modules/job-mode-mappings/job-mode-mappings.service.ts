import { Injectable, NotFoundException } from '@nestjs/common';
import { JobModeMappingsRepository } from './repository/job-mode-mappings.repository';
import { CreateJobModeMappingDto } from './dto/create-job-mode-mapping.dto';
import { UpdateJobModeMappingDto } from './dto/update-job-mode-mapping.dto';

@Injectable()
export class JobModeMappingsService {
  constructor(private jobModeMappingsRepository: JobModeMappingsRepository) {}

  async createJobModeMapping(createJobModeMappingDto: CreateJobModeMappingDto) {
    const newJobModeMapping = await this.jobModeMappingsRepository.create(
      createJobModeMappingDto,
    );
    return newJobModeMapping;
  }

  async findAllJobModeMappings(page: number = 1, limit: number) {
    const { total, results } = await this.jobModeMappingsRepository.findAll(
      page,
      limit,
    );

    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneJobModeMapping(id: string) {
    const jobModeMapping = await this.jobModeMappingsRepository.findById(id);
    if (!jobModeMapping) {
      throw new NotFoundException(`Not found job mode mapping with ID: ${id}`);
    }
    return jobModeMapping;
  }

  async updateJobModeMapping(
    id: string,
    updateJobModeMappingDto: UpdateJobModeMappingDto,
  ) {
    const updatedJobModeMapping = await this.jobModeMappingsRepository.update(
      id,
      updateJobModeMappingDto,
    );
    if (!updatedJobModeMapping) {
      throw new NotFoundException(`Not found job mode mapping with ID: ${id}`);
    }
    return updatedJobModeMapping;
  }

  async deleteJobModeMapping(id: string) {
    const deletedJobModeMapping =
      await this.jobModeMappingsRepository.delete(id);
    if (!deletedJobModeMapping) {
      throw new NotFoundException(`Not found job mode mapping with ID: ${id}`);
    }
    return deletedJobModeMapping;
  }
}
