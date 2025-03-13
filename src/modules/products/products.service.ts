import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createOne(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(createProductDto);
  }

  async createMany(createProductDto: CreateProductDto[]): Promise<Product[]> {
    if (!Array.isArray(createProductDto) || createProductDto.length === 0) {
      throw new BadRequestException('Invalid container data');
    }
    return this.productModel.insertMany(createProductDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    total: number;
    page: number;
    limit: number;
    results: Product[];
  }> {
    const total = await this.productModel.countDocuments();
    const results = await this.productModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { total, page, limit, results };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Container not found');
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) throw new NotFoundException('Container not found');
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Container not found');
  }
}
