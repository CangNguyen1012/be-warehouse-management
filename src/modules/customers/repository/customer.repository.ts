import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../schemas/customer.schema';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return await newCustomer.save();
  }

  async findAll(
    page: number,
    limit: number,
    customerTypeCode?: string,
    taxcode?: string,
    customerName?: string,
    moneyCredit?: string,
    isActive?: boolean,
  ): Promise<{ total: number; results: Customer[] }> {
    const filter: {
      customerTypeCode?: string;
      taxcode?: string;
      customerName?: string;
      moneyCredit?: string;
      isActive?: boolean;
    } = {};
    if (customerTypeCode) {
      filter.customerTypeCode = customerTypeCode;
    }
    if (taxcode) {
      filter.taxcode = taxcode;
    }
    if (customerName) {
      filter.customerName = customerName;
    }
    if (moneyCredit) {
      filter.moneyCredit = moneyCredit;
    }
    if (typeof isActive === 'boolean') {
      filter.isActive = isActive;
    }
    const total = await this.customerModel.countDocuments(filter);
    const skip = (page - 1) * limit;
    const results = await this.customerModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<Customer | null> {
    return await this.customerModel.findById(id).lean();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer | null> {
    return await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, {
      new: true,
      lean: true,
    });
  }

  async delete(id: string): Promise<Customer | null> {
    return await this.customerModel.findByIdAndDelete(id).lean();
  }
}
