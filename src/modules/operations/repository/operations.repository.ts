import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Operation, OperationDocument } from '../schemas/operation.schema';
import { Model } from 'mongoose';
import { CreateOperationDto } from '../dtos/create-operation.dto';
import { UpdateOperationDto } from '../dtos/update-operation.dto';

@Injectable()
export class OperationsRepository {
  constructor(
    @InjectModel(Operation.name)
    private operationModel: Model<OperationDocument>,
  ) {}

  async create(createOperationDto: CreateOperationDto): Promise<Operation> {
    return await this.operationModel.create(createOperationDto);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: Operation[] }> {
    const total = await this.operationModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.operationModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<Operation> {
    const operation = await this.operationModel.findById(id);
    if (!operation)
      throw new NotFoundException(`Operation with ID ${id} not found`);
    return operation;
  }

  async update(id: string, updateOperationDto: UpdateOperationDto) {
    const updatedOperation = await this.operationModel.findByIdAndUpdate(
      id,
      updateOperationDto,
      { new: true },
    );
    if (!updatedOperation)
      throw new NotFoundException(`Operation with ID ${id} not found`);
    return updatedOperation;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.operationModel.findByIdAndDelete(id);
    if (!deleted)
      throw new NotFoundException(`Operation with ID ${id} not found`);
  }
}
