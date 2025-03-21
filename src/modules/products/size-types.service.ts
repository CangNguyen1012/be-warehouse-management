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

  async findWithFilters(filters: any, page = 1, limit = 10): Promise<any> {
    const query: any = {};

    // Handling filtering logic
    if (filters['filter[0][field]'] && filters['filter[0][value]']) {
      const field = filters['filter[0][field]'];
      const value = filters['filter[0][value]'];

      if (filters['filter[0][type]'] === 'contains') {
        query[field] = { $regex: value, $options: 'i' }; // Case-insensitive search
      } else {
        query[field] = value;
      }
    }

    // Fetch total count before applying pagination
    const total = await this.sizeTypeModel.countDocuments(query).exec();

    // Apply pagination
    const results = await this.sizeTypeModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      statusCode: 200,
      data: { page, limit, total, results },
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
