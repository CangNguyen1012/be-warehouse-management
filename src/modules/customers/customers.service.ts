import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repository/customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private customerRepository: CustomerRepository) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const newCustomer = await this.customerRepository.create(createCustomerDto);
    return newCustomer;
  }

  async findAllCustomer(
    page: number = 1,
    limit: number,
    customerTypeCode?: string,
    taxcode?: string,
    customerName?: string,
    moneyCredit?: string,
    isActive?: boolean,
  ) {
    const { total, results } = await this.customerRepository.findAll(
      page,
      limit,
      customerTypeCode,
      taxcode,
      customerName,
      moneyCredit,
      isActive,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findCustomerById(id: string) {
    const customer = await this.customerRepository.findById(id);
    return customer;
  }

  async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updatecustomer = await this.customerRepository.update(
      id,
      updateCustomerDto,
    );
    return updatecustomer;
  }

  async deleteCustomer(id: string) {
    const deletecustomer = await this.customerRepository.delete(id);
    return deletecustomer;
  }
}
