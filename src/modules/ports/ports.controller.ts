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
import { PortsService } from './ports.service';
import { CreatePortDto } from './dtos/create-ports.dto';
import { UpdatePortDto } from './dtos/update-ports.dto';

@Controller('ports')
@ApiTags('Ports')
export class PortsController {
  constructor(private portService: PortsService) {}

  @Post()
  @ApiOperation({ summary: 'Create port' })
  @ApiResponse({ status: 201, description: 'Port created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createPortDto: CreatePortDto) {
    return await this.portService.create(createPortDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ports' })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Ports retrieved successfully' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ) {
    return await this.portService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get port by id' })
  @ApiResponse({ status: 200, description: 'Port retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Port not found' })
  async findOne(@Param('id') id: string) {
    return await this.portService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update port' })
  @ApiResponse({ status: 200, description: 'Port updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Port not found' })
  async update(@Param('id') id: string, @Body() updatePortDto: UpdatePortDto) {
    return await this.portService.update(id, updatePortDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete port' })
  @ApiResponse({ status: 200, description: 'Port deleted successfully' })
  @ApiResponse({ status: 404, description: 'Port not found' })
  async remove(@Param('id') id: string) {
    return await this.portService.remove(id);
  }
}
