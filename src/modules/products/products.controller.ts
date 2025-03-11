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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create one or multiple products' })
  @ApiResponse({
    status: 201,
    description: 'The product(s) have been successfully created.',
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
        throw new BadRequestException('Product data is required');
      }

      const products = Array.isArray(createProductDto)
        ? await this.productsService.createMany(createProductDto)
        : await this.productsService.createOne(createProductDto);

      return { message: 'Product(s) successfully created', data: products };
    } catch (error) {
      console.error('Error creating product:', error);
      throw new InternalServerErrorException('Failed to create product(s)');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAll(): Promise<any> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new NotFoundException('Product not found');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
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
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async remove(@Param('id') id: string): Promise<any> {
    await this.productsService.remove(id);
    return { message: 'Product successfully deleted' };
  }
}
