import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
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
    description: 'The container(s) have been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: [CreateProductDto] })
  async create(
    @Body() createProductDto: CreateProductDto | CreateProductDto[],
  ): Promise<any> {
    try {
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
    } catch (error) {
      console.error('Error creating container:', error);
      throw new InternalServerErrorException('Failed to create container(s)');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination' })
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
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<any> {
    try {
      return await this.productsService.findAll(page, limit);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a container by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Container ID' })
  @ApiResponse({ status: 200, description: 'Return the container.' })
  @ApiResponse({ status: 404, description: 'Container not found.' })
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      console.error('Error fetching container:', error);
      throw new NotFoundException('Container not found');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a container' })
  @ApiParam({ name: 'id', required: true, description: 'Container ID' })
  @ApiResponse({
    status: 200,
    description: 'The container has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<any> {
    if (!Object.keys(updateProductDto).length) {
      throw new BadRequestException('Update data is required');
    }

    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a container' })
  @ApiParam({ name: 'id', required: true, description: 'Container ID' })
  @ApiResponse({
    status: 200,
    description: 'The container has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async remove(@Param('id') id: string): Promise<any> {
    await this.productsService.remove(id);
    return { message: 'Container successfully deleted' };
  }
}
