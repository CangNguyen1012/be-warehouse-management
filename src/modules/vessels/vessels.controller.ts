import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VesselsService } from './vessels.service';
import { CreateVesselDto } from './dtos/create-vessels.dto';
import { UpdateVesselDto } from './dtos/update-vessels.dto';

@Controller('vessels')
@ApiTags('Vessels')
export class VesselsController {
  constructor(private vesselService: VesselsService) {}

  @Post()
  @ApiOperation({ summary: 'Create vessel' })
  @ApiResponse({ status: 201, description: 'Vessel created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createVesselDto: CreateVesselDto) {
    return await this.vesselService.create(createVesselDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vessels' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Vessels retrieved successfully' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ) {
    return await this.vesselService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vessel by id' })
  @ApiResponse({ status: 200, description: 'Vessel retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Vessel not found' })
  async findOne(@Param('id') id: string) {
    return await this.vesselService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update vessel' })
  @ApiResponse({ status: 200, description: 'Vessel updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Vessel not found' })
  async update(
    @Param('id') id: string,
    @Body() updateVesselDto: UpdateVesselDto,
  ) {
    return await this.vesselService.update(id, updateVesselDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete vessel' })
  @ApiResponse({ status: 200, description: 'Vessel deleted successfully' })
  @ApiResponse({ status: 404, description: 'Vessel not found' })
  async remove(@Param('id') id: string) {
    return await this.vesselService.remove(id);
  }
}
