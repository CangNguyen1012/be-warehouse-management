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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { SizeTypesService } from './size-types.service';
import { CreateSizeTypeDto } from './dto/create-size-type.dto';
import { UpdateSizeTypeDto } from './dto/update-size-type.dto';

@ApiTags('Size Types')
@Controller('size-types')
export class SizeTypesController {
  constructor(private sizeTypesService: SizeTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create one or multiple size-types' })
  @ApiResponse({
    status: 201,
    description: 'Size-type(s) created successfully.',
  })
  @ApiBody({ type: CreateSizeTypeDto })
  async create(@Body() createSizeTypeDto: CreateSizeTypeDto) {
    return await this.sizeTypesService.createSizeType(createSizeTypeDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list of size types' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'operationCode', required: false, type: String })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
    @Query('operationCode') operationCode: string,
  ) {
    return await this.sizeTypesService.findAllSizeTypes(
      page,
      limit,
      operationCode,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a size-type by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Container ID' })
  @ApiResponse({
    status: 200,
    description: 'Size-type retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Size-type not found.' })
  async findOne(@Param('id') id: string) {
    return await this.sizeTypesService.findOneSizeType(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a size-type' })
  @ApiParam({ name: 'id', required: true, description: 'Size-type ID' })
  @ApiResponse({ status: 200, description: 'Size-type updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid update data.' })
  @ApiResponse({ status: 404, description: 'Size-type not found.' })
  @ApiBody({ type: UpdateSizeTypeDto })
  async update(
    @Param('id') id: string,
    @Body() updateSizeTypeDto: UpdateSizeTypeDto,
  ) {
    return await this.sizeTypesService.updateSizeType(id, updateSizeTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Size-type' })
  @ApiParam({ name: 'id', required: true, description: 'Size-type ID' })
  @ApiResponse({ status: 200, description: 'Size-type deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Size-type not found.' })
  async remove(@Param('id') id: string) {
    return await this.sizeTypesService.deleteSizeType(id);
  }
}
