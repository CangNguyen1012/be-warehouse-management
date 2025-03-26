import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CustomerType,
  CustomerTypeDocument,
} from '../schemas/customer-type.schema';
import { Model } from 'mongoose';
import { CreateCustomerTypeDto } from '../dto/create-customer-types.dto';

@Injectable()
export class CustomerTypesRepository {
  constructor(
    @InjectModel(CustomerType.name)
    private customerTypeModel: Model<CustomerTypeDocument>,
  ) {}

  async create(
    createCustomerTypeDto: CreateCustomerTypeDto,
  ): Promise<CustomerType> {
    return await this.customerTypeModel.create(createCustomerTypeDto);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: CustomerType[] }> {
    const total = await this.customerTypeModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.customerTypeModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<CustomerType> {
    const customerType = await this.customerTypeModel.findById(id);
    if (!customerType)
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
    return customerType;
  }

  async update(id: string, updateCustomerTypeDto: CreateCustomerTypeDto) {
    const updatedCustomerType = await this.customerTypeModel.findByIdAndUpdate(
      id,
      updateCustomerTypeDto,
      { new: true },
    );
    if (!updatedCustomerType)
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
    return updatedCustomerType;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.customerTypeModel.findByIdAndDelete(id);
    if (!deleted)
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
  }
}
