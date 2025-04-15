import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobModeMappingsService } from './job-mode-mappings.service';
import { CreateJobModeMappingDto } from './dto/create-job-mode-mapping.dto';
import { UpdateJobModeMappingDto } from './dto/update-job-mode-mapping.dto';

@ApiTags('Job-mode-mappings')
@Controller('job-mode-mappings')
export class JobModeMappingsController {
  constructor(private jobModeMappingsService: JobModeMappingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create job mode mapping' })
  @ApiResponse({ status: 201, description: 'Job mode mapping created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createJobModeMappingDto: CreateJobModeMappingDto) {
    return await this.jobModeMappingsService.createJobModeMapping(
      createJobModeMappingDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all job mode mappings' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({
    status: 200,
    description: 'Job mode mappings retrieved successfully',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ) {
    return await this.jobModeMappingsService.findAllJobModeMappings(
      page,
      limit,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one job mode mapping' })
  @ApiResponse({
    status: 200,
    description: 'Job mode mapping retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Job mode mapping not found' })
  async findOne(@Param('id') id: string) {
    return await this.jobModeMappingsService.findOneJobModeMapping(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update job mode mapping' })
  @ApiResponse({
    status: 200,
    description: 'Job mode mapping updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Job mode mapping not found' })
  async update(
    @Param('id') id: string,
    @Body() updateJobModeMappingDto: UpdateJobModeMappingDto,
  ) {
    return await this.jobModeMappingsService.updateJobModeMapping(
      id,
      updateJobModeMappingDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete job mode mapping' })
  @ApiResponse({
    status: 200,
    description: 'Job mode mapping deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Job mode mapping not found' })
  async delete(@Param('id') id: string) {
    return await this.jobModeMappingsService.deleteJobModeMapping(id);
  }
}
