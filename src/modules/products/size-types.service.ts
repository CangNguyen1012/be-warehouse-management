import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SizeType, SizeTypeDocument } from './schemas/size-type.schema';
import { CreateSizeTypeDto } from './dto/create-size-type.dto';
import { UpdateSizeTypeDto } from './dto/update-size-type.dto';

@Injectable()
export class SizeTypesService {
  constructor(
    @InjectModel(SizeType.name)
    private sizeTypeModel: Model<SizeTypeDocument>,
  ) {}

  async createOne(createProductDto: CreateSizeTypeDto) {
    return await this.sizeTypeModel.create(createProductDto);
  }

  async createMany(createProductDto: CreateSizeTypeDto[]): Promise<SizeType[]> {
    if (!createProductDto?.length) {
      throw new BadRequestException('Container data is required');
    }
    return await this.sizeTypeModel.insertMany(createProductDto);
  }

  async findAll(page: number = 1, limit: number) {
    const total = await this.sizeTypeModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.sizeTypeModel.find().skip(skip).limit(limit);

    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string): Promise<SizeType> {
    const product = await this.sizeTypeModel.findById(id).exec();
    if (!product)
      throw new NotFoundException(`Container with ID ${id} not found`);
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateSizeTypeDto,
  ): Promise<SizeType> {
    if (!Object.keys(updateProductDto).length) {
      throw new BadRequestException('Update data is required');
    }

    const updatedProduct = await this.sizeTypeModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct)
      throw new NotFoundException(`Container with ID ${id} not found`);
    return updatedProduct;
  }

  async remove(
    id: string,
  ): Promise<{ message: string; deletedProduct: SizeType }> {
    const deletedProduct = await this.sizeTypeModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Container with ID ${id} not found`);
    }

    return { message: 'Container successfully deleted', deletedProduct };
  }
}
