import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { JobModeService } from './job-mode.service';
import { CreateJobModeDto } from './dto/create-job-mode.dto';
import { UpdateJobModeDto } from './dto/update-job-mode.dto';

@Controller('job-modes')
export class JobModeController {
  constructor(private readonly jobModeService: JobModeService) {}

  @Post()
  async create(@Body() createJobModeDto: CreateJobModeDto) {
    return {
      statusCode: 201,
      data: [await this.jobModeService.create(createJobModeDto)],
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return {
      statusCode: 200,
      data: await this.jobModeService.findAll(Number(page), Number(limit)),
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: 200,
      data: [await this.jobModeService.findOne(id)],
      timestamp: new Date().toISOString(),
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobModeDto: UpdateJobModeDto,
  ) {
    return {
      statusCode: 200,
      data: [await this.jobModeService.update(id, updateJobModeDto)],
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.jobModeService.delete(id);
    return { statusCode: 200, timestamp: new Date().toISOString() };
  }
}
