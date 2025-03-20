import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  BadRequestException,
  NotFoundException,
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
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiBody({ type: [CreateSizeTypeDto] })
  async create(
    @Body() createSizeTypeDto: CreateSizeTypeDto | CreateSizeTypeDto[],
  ) {
    if (
      !createSizeTypeDto ||
      (Array.isArray(createSizeTypeDto) && createSizeTypeDto.length === 0)
    ) {
      throw new BadRequestException('Size-type data is required');
    }

    const products = Array.isArray(createSizeTypeDto)
      ? await this.sizeTypesService.createMany(createSizeTypeDto)
      : await this.sizeTypesService.createOne(createSizeTypeDto);

    return { message: 'Size-type(s) successfully created', data: products };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all size-types with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Size-types retrieved successfully.',
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.sizeTypesService.findAll(Number(page), Number(limit));
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
    const size = await this.sizeTypesService.findOne(id);
    if (!size) {
      throw new NotFoundException(`Size-type with ID ${id} not found`);
    }
    return size;
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
    if (!Object.keys(updateSizeTypeDto).length) {
      throw new BadRequestException('Update data is required');
    }

    const updatedSizeType = await this.sizeTypesService.update(
      id,
      updateSizeTypeDto,
    );
    if (!updatedSizeType) {
      throw new NotFoundException(`Size-type with ID ${id} not found`);
    }
    return updatedSizeType;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Size-type' })
  @ApiParam({ name: 'id', required: true, description: 'Size-type ID' })
  @ApiResponse({ status: 200, description: 'Size-type deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Size-type not found.' })
  async remove(@Param('id') id: string) {
    const existingSizeType = await this.sizeTypesService.findOne(id);
    if (!existingSizeType) {
      throw new NotFoundException(`Size-type with ID ${id} not found`);
    }

    await this.sizeTypesService.remove(id);
    return { message: 'Size-type successfully deleted' };
  }
}
