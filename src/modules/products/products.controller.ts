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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Containers')
@Controller('containers')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create one or multiple containers' })
  @ApiResponse({
    status: 201,
    description: 'Container(s) created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiBody({ type: [CreateProductDto] })
  async create(
    @Body() createProductDto: CreateProductDto | CreateProductDto[],
  ) {
    if (
      !createProductDto ||
      (Array.isArray(createProductDto) && createProductDto.length === 0)
    ) {
      throw new BadRequestException('Container data is required');
    }

    const products = Array.isArray(createProductDto)
      ? await this.productsService.createMany(createProductDto)
      : await this.productsService.createOne(createProductDto);

    return { message: 'Container(s) successfully created', data: products };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all containers with pagination' })
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
    description: 'Containers retrieved successfully.',
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.productsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a container by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Container ID' })
  @ApiResponse({
    status: 200,
    description: 'Container retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Container not found.' })
  async findOne(@Param('id') id: string) {
    const container = await this.productsService.findOne(id);
    if (!container) {
      throw new NotFoundException(`Container with ID ${id} not found`);
    }
    return container;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a container' })
  @ApiParam({ name: 'id', required: true, description: 'Container ID' })
  @ApiResponse({ status: 200, description: 'Container updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid update data.' })
  @ApiResponse({ status: 404, description: 'Container not found.' })
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (!Object.keys(updateProductDto).length) {
      throw new BadRequestException('Update data is required');
    }

    const updatedContainer = await this.productsService.update(
      id,
      updateProductDto,
    );
    if (!updatedContainer) {
      throw new NotFoundException(`Container with ID ${id} not found`);
    }
    return updatedContainer;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a container' })
  @ApiParam({ name: 'id', required: true, description: 'Container ID' })
  @ApiResponse({ status: 200, description: 'Container deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Container not found.' })
  async remove(@Param('id') id: string) {
    const existingContainer = await this.productsService.findOne(id);
    if (!existingContainer) {
      throw new NotFoundException(`Container with ID ${id} not found`);
    }

    await this.productsService.remove(id);
    return { message: 'Container successfully deleted' };
  }
}
