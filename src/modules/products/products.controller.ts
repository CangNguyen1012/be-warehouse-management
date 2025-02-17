import { Body, Controller, Delete, Get, Param, Patch, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: CreateProductDto })
    async create(@Body() createProductDto: CreateProductDto): Promise<any> {
        try {
            return await this.productsService.create(createProductDto);
        } catch (error) {
            console.error('Error creating product:', error);
            throw new HttpException('Error creating product', HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Return all products.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async findAll(): Promise<any> {
        try {
            return await this.productsService.findAll();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new HttpException('Error fetching products', HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiParam({ name: 'id', required: true, description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: UpdateProductDto })
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<any> {
        try {
            return await this.productsService.update(id, updateProductDto);
        } catch (error) {
            console.error('Error updating product:', error);
            throw new HttpException('Error updating product', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiParam({ name: 'id', required: true, description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async remove(@Param('id') id: string): Promise<any> {
        try {
            return await this.productsService.remove(id);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw new HttpException('Error deleting product', HttpStatus.BAD_REQUEST);
        }
    }
}
