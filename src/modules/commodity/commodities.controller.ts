import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CommoditiesService } from './commodities.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';

@ApiTags('commodities')
@Controller('commodities')
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new commodity' })
  @ApiResponse({ status: 201, description: 'Commodity created successfully.' })
  create(@Body() createCommodityDto: CreateCommodityDto) {
    return this.commoditiesService.createCommodity(createCommodityDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Retrieve all commodities' })
  @ApiResponse({
    status: 200,
    description: 'List of commodities retrieved successfully.',
  })
  findAll() {
    return this.commoditiesService.findAllCommodities();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Retrieve a commodity by ID' })
  @ApiParam({ name: 'id', description: 'Commodity ID' })
  @ApiResponse({
    status: 200,
    description: 'Commodity retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Commodity not found.' })
  findOne(@Param('id') id: string) {
    return this.commoditiesService.findByIdCommodity(id);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a commodity by ID' })
  @ApiParam({ name: 'id', description: 'Commodity ID' })
  @ApiResponse({ status: 200, description: 'Commodity updated successfully.' })
  @ApiResponse({ status: 404, description: 'Commodity not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCommodityDto: UpdateCommodityDto,
  ) {
    return this.commoditiesService.updateCommodity(id, updateCommodityDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a commodity by ID' })
  @ApiParam({ name: 'id', description: 'Commodity ID' })
  @ApiResponse({ status: 204, description: 'Commodity deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Commodity not found.' })
  remove(@Param('id') id: string) {
    return this.commoditiesService.deleteCommodity(id);
  }
}
