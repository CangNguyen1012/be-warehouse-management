import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CommoditiesService } from './commodities.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';

@ApiTags('commodities')
@Controller('commodities')
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new commodity' })
  @ApiResponse({ status: 201, description: 'Commodity created successfully.' })
  @ApiBody({ type: CreateCommodityDto })
  create(@Body() createCommodityDto: CreateCommodityDto) {
    return this.commoditiesService.create(createCommodityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all commodities' })
  @ApiResponse({
    status: 200,
    description: 'List of commodities retrieved successfully.',
  })
  findAll() {
    return this.commoditiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a commodity by ID' })
  @ApiParam({ name: 'id', description: 'Commodity ID' })
  @ApiResponse({
    status: 200,
    description: 'Commodity retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Commodity not found.' })
  findOne(@Param('id') id: string) {
    return this.commoditiesService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a commodity by ID' })
  @ApiParam({ name: 'id', description: 'Commodity ID' })
  @ApiResponse({ status: 200, description: 'Commodity updated successfully.' })
  @ApiResponse({ status: 404, description: 'Commodity not found.' })
  @ApiBody({ type: UpdateCommodityDto })
  update(
    @Param('id') id: string,
    @Body() updateCommodityDto: UpdateCommodityDto,
  ) {
    return this.commoditiesService.update(id, updateCommodityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a commodity by ID' })
  @ApiParam({ name: 'id', description: 'Commodity ID' })
  @ApiResponse({ status: 204, description: 'Commodity deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Commodity not found.' })
  remove(@Param('id') id: string) {
    return this.commoditiesService.delete(id);
  }
}
