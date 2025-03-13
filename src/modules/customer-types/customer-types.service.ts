import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer-type.schema';
import { CreateCustomerTypeDto } from './dto/create-customer-types.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-types.dto';

@Injectable()
export class CustomerTypesService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(
    createCustomerTypeDto: CreateCustomerTypeDto,
  ): Promise<Customer> {
    return this.customerModel.create(createCustomerTypeDto);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Customer> {
    const customerType = await this.customerModel.findById(id).lean().exec();
    if (!customerType) {
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
    }
    return customerType;
  }

  async update(
    id: string,
    updateCustomerTypeDto: UpdateCustomerTypeDto,
  ): Promise<Customer> {
    const updatedCustomerType = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerTypeDto, { new: true }) // Removed `lean: true`
      .exec();

    if (!updatedCustomerType) {
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
    }

    return updatedCustomerType;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.customerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
    }
    return { message: 'CustomerType deleted successfully' };
  }
}
