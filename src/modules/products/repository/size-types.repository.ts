import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SizeType, SizeTypeDocument } from '../schemas/size-type.schema';
import { CreateSizeTypeDto } from '../dto/create-size-type.dto';
import { UpdateSizeTypeDto } from '../dto/update-size-type.dto';

@Injectable()
export class SizeTypesRepository {
  constructor(
    @InjectModel(SizeType.name) private sizeTypeModel: Model<SizeTypeDocument>,
  ) {}

  async create(createSizeTypeDto: CreateSizeTypeDto): Promise<SizeType> {
    return await this.sizeTypeModel.create(createSizeTypeDto);
  }

  async findAll(
    page: number,
    limit: number,
    operationCode?: string,
  ): Promise<{ total: number; results: SizeType[] }> {
    const filter: { operationCode?: string } = {};
    if (operationCode) {
      filter.operationCode = operationCode;
    }
    const total = await this.sizeTypeModel.countDocuments(filter);
    const skip = (page - 1) * limit;
    const results = await this.sizeTypeModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<SizeType> {
    const sizeType = await this.sizeTypeModel.findById(id);
    if (!sizeType)
      throw new NotFoundException(`SizeType with ID ${id} not found`);
    return sizeType;
  }

  async update(id: string, updateSizeTypeDto: UpdateSizeTypeDto) {
    const updatedSizeType = await this.sizeTypeModel.findByIdAndUpdate(
      id,
      updateSizeTypeDto,
      { new: true },
    );
    if (!updatedSizeType)
      throw new NotFoundException(`SizeType with ID ${id} not found`);
    return updatedSizeType;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.sizeTypeModel.findByIdAndDelete(id);
    if (!deleted)
      throw new NotFoundException(`SizeType with ID ${id} not found`);
  }

  async findByOperationCode(operationCode: string) {
    return await this.sizeTypeModel.find({ operationCode }).lean();
  }
}
