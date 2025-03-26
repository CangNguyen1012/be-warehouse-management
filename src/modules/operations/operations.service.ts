import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';
import { OperationsRepository } from './repository/operations.repository';

@Injectable()
export class OperationsService {
  constructor(private operationsRepository: OperationsRepository) {}

  async createOperation(createOperationDto: CreateOperationDto) {
    return await this.operationsRepository.create(createOperationDto);
  }

  async findAllOperations(page: number, limit: number) {
    const { total, results } = await this.operationsRepository.findAll(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneOperation(id: string) {
    const operation = await this.operationsRepository.findById(id);
    if (!operation)
      throw new NotFoundException(`Operation with ID ${id} not found`);
    return operation;
  }

  async updateOperation(id: string, updateOperationDto: UpdateOperationDto) {
    return await this.operationsRepository.update(id, updateOperationDto);
  }

  async deleteOperation(id: string) {
    return await this.operationsRepository.delete(id);
  }
}
