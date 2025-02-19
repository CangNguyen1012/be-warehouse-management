import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { Response } from 'express';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateProductDto })
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const product = await this.productsService.create(createProductDto);
      return res.status(HttpStatus.CREATED).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new HttpException('Error creating product', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAll(@Res() res: Response): Promise<any> {
    try {
      const products = await this.productsService.findAll();
      return res.status(HttpStatus.OK).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new HttpException(
        'Error fetching products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const product = await this.productsService.findOne(id);
      return res.status(HttpStatus.OK).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
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
    @Res() res: Response,
  ): Promise<any> {
    try {
      const updatedProduct = await this.productsService.update(
        id,
        updateProductDto,
      );
      return res.status(HttpStatus.OK).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      throw new HttpException('Error updating product', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async remove(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      await this.productsService.remove(id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Product successfully deleted' });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new HttpException('Error deleting product', HttpStatus.BAD_REQUEST);
    }
  }
}
