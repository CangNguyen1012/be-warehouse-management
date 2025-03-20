import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';

@Controller('jobs')
@ApiTags('Jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create job' })
  @ApiResponse({
    status: 201,
    description: 'The job has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createJobDto: CreateJobDto) {
    return await this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Get all jobs' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ) {
    return await this.jobsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by id' })
  @ApiResponse({ status: 200, description: 'Get job by id' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async findOne(@Query('id') id: string) {
    return await this.jobsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update job by id' })
  @ApiResponse({ status: 200, description: 'Update job by id' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async update(@Query('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete job by id' })
  @ApiResponse({ status: 200, description: 'Delete job by id' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async remove(@Query('id') id: string) {
    return await this.jobsService.remove(id);
  }
}
