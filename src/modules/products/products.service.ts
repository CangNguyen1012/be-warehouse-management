import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createOne(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productModel.create(createProductDto);
  }

  async createMany(createProductDto: CreateProductDto[]): Promise<Product[]> {
    if (!createProductDto?.length) {
      throw new BadRequestException('Container data is required');
    }
    return await this.productModel.insertMany(createProductDto);
  }

  async findAll(page = 1, limit = 10) {
    const total = await this.productModel.countDocuments().exec();
    const results = await this.productModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      statusCode: 200,
      data: { page, limit, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product)
      throw new NotFoundException(`Container with ID ${id} not found`);
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (!Object.keys(updateProductDto).length) {
      throw new BadRequestException('Update data is required');
    }

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct)
      throw new NotFoundException(`Container with ID ${id} not found`);
    return updatedProduct;
  }

  async remove(
    id: string,
  ): Promise<{ message: string; deletedProduct: Product }> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Container with ID ${id} not found`);
    }

    return { message: 'Container successfully deleted', deletedProduct };
  }
}
