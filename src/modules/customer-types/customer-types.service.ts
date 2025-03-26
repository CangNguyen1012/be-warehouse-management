import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerTypeDto } from './dto/create-customer-types.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-types.dto';
import { CustomerTypesRepository } from './repository/customer-types.repository';

@Injectable()
export class CustomerTypesService {
  constructor(private customerTypesRepository: CustomerTypesRepository) {}

  async createCustomerType(createCustomerTypeDto: CreateCustomerTypeDto) {
    return await this.customerTypesRepository.create(createCustomerTypeDto);
  }

  async findAllCustomerTypes(page: number, limit: number) {
    const { total, results } = await this.customerTypesRepository.findAll(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneCustomerType(id: string) {
    const customerType = await this.customerTypesRepository.findById(id);
    if (!customerType)
      throw new NotFoundException(`CustomerType with ID ${id} not found`);
    return customerType;
  }

  async updateCustomerType(
    id: string,
    updateCustomerTypeDto: UpdateCustomerTypeDto,
  ) {
    return await this.customerTypesRepository.update(id, updateCustomerTypeDto);
  }

  async deleteCustomerType(id: string) {
    return await this.customerTypesRepository.delete(id);
  }
}
