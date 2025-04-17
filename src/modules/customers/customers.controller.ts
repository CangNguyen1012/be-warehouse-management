import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 201,
    description: 'Customer created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.createCustomer(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'customerTypeCode', required: false, type: String })
  @ApiQuery({ name: 'taxcode', required: false, type: String })
  @ApiQuery({ name: 'customerName', required: false, type: String })
  @ApiQuery({ name: 'moneyCredit', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Customers retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
    @Query('customerTypeCode') customerTypeCode?: string,
    @Query('taxcode') taxcode?: string,
    @Query('customerName') customerName?: string,
    @Query('moneyCredit') moneyCredit?: string,
    @Query('isActive') isActive?: boolean,
  ) {
    return await this.customersService.findAllCustomer(
      page,
      limit,
      customerTypeCode,
      taxcode,
      customerName,
      moneyCredit,
      isActive,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by id' })
  @ApiResponse({ status: 200, description: 'Customer retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findById(@Param('id') id: string) {
    return await this.customersService.findCustomerById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer by id' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customersService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by id' })
  @ApiResponse({ status: 200, description: 'Customer deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async delete(@Param('id') id: string) {
    return await this.customersService.deleteCustomer(id);
  }
}
