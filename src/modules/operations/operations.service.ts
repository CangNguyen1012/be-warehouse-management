/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Operation, OperationDocument } from './schemas/operation.schema';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel(Operation.name)
    private operationModel: Model<OperationDocument>,
  ) {}

  async findAll(query: any = {}, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const results = await this.operationModel
      .find(query)
      .skip(skip)
      .limit(limit);

    return {
      statusCode: 200,
      data: { limit, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string) {
    return this.operationModel.findById(id);
  }

  async create(createOperationDto: CreateOperationDto) {
    const createdOperation = new this.operationModel(createOperationDto);
    return createdOperation.save();
  }

  async update(id: string, updateOperationDto: UpdateOperationDto) {
    return this.operationModel.findByIdAndUpdate(id, updateOperationDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.operationModel.findByIdAndDelete(id);
  }
}
