import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schemas/customer-type.schema';
import { CreateCustomerTypeDto } from './dto/create-customer-types.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-types.dto';

@Injectable()
export class CustomerTypesService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async create(
    createCustomerTypeDto: CreateCustomerTypeDto,
  ): Promise<Customer> {
    const createdCustomerType = new this.customerModel(createCustomerTypeDto);
    return createdCustomerType.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    const customerType = await this.customerModel.findById(id).exec();
    if (!customerType)
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
    return customerType;
  }

  async update(
    id: string,
    updateCustomerTypeDto: UpdateCustomerTypeDto,
  ): Promise<Customer> {
    const updatedCustomerType = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerTypeDto, { new: true })
      .exec();
    if (!updatedCustomerType)
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
    return updatedCustomerType;
  }

  async remove(id: string): Promise<void> {
    const result = await this.customerModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
  }
}
