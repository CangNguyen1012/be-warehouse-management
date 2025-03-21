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
import { ImosService } from './imos.service';
import { CreateImoDto } from './dtos/create-imo.dto';
import { UpdateImoDto } from './dtos/update-imo.dto';

@Controller('imos')
@ApiTags('Imos')
export class ImosController {
  constructor(private imosService: ImosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new imo' })
  @ApiResponse({
    status: 201,
    description: 'The imo has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createImoDto: CreateImoDto) {
    return await this.imosService.create(createImoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all imos' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 5000 })
  @ApiResponse({ status: 200, description: 'Get all imos' })
  async findAll(@Query('limit') limit: number) {
    return await this.imosService.findAll(1, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a imo by id' })
  @ApiResponse({ status: 200, description: 'Get a imo by id' })
  @ApiResponse({ status: 404, description: 'Imo not found' })
  async findOne(@Query('id') id: string) {
    return await this.imosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a imo by id' })
  @ApiResponse({ status: 200, description: 'Update a imo by id' })
  @ApiResponse({ status: 404, description: 'Imo not found' })
  async update(@Query('id') id: string, @Body() updateImoDto: UpdateImoDto) {
    return await this.imosService.update(id, updateImoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a imo by id' })
  @ApiResponse({ status: 200, description: 'Delete a imo by id' })
  @ApiResponse({ status: 404, description: 'Imo not found' })
  async remove(@Query('id') id: string) {
    return await this.imosService.remove(id);
  }
}
