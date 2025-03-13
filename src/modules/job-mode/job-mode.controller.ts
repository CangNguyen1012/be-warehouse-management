import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { JobModeService } from './job-mode.service';
import { CreateJobModeDto } from './dto/create-job-mode.dto';
import { UpdateJobModeDto } from './dto/update-job-mode.dto';
import { JobMode } from './schemas/job-mode.schema';

@ApiTags('Job Modes') // Group in Swagger UI
@Controller('job-modes')
export class JobModeController {
  constructor(private readonly jobModeService: JobModeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Job Mode' })
  @ApiResponse({
    status: 201,
    description: 'Job Mode created successfully',
    type: JobMode,
  })
  async create(@Body() createJobModeDto: CreateJobModeDto) {
    const data = await this.jobModeService.create(createJobModeDto);
    return { statusCode: 201, data };
  }

  @Get()
  @ApiOperation({ summary: 'Get all Job Modes with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Items per page (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of job modes',
    type: [JobMode],
  })
  async findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return await this.jobModeService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Job Mode by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Job Mode ID' })
  @ApiResponse({ status: 200, description: 'Job Mode found', type: JobMode })
  @ApiResponse({ status: 404, description: 'Job Mode not found' })
  async findOne(@Param('id') id: string) {
    const data = await this.jobModeService.findOne(id);
    return { statusCode: 200, data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Job Mode by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Job Mode ID' })
  @ApiResponse({
    status: 200,
    description: 'Job Mode updated successfully',
    type: JobMode,
  })
  @ApiResponse({ status: 404, description: 'Job Mode not found' })
  async update(
    @Param('id') id: string,
    @Body() updateJobModeDto: UpdateJobModeDto,
  ) {
    const data = await this.jobModeService.update(id, updateJobModeDto);
    return { statusCode: 200, data };
  }

  @Delete(':id')
  @HttpCode(204) // No Content
  @ApiOperation({ summary: 'Delete a Job Mode by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Job Mode ID' })
  @ApiResponse({ status: 204, description: 'Job Mode deleted successfully' })
  @ApiResponse({ status: 404, description: 'Job Mode not found' })
  async remove(@Param('id') id: string) {
    await this.jobModeService.delete(id);
  }
}
