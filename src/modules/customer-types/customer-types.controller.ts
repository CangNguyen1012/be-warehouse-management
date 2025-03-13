import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomerTypesService } from './customer-types.service';
import { CreateCustomerTypeDto } from './dto/create-customer-types.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-types.dto';
import { Customer } from './schemas/customer-type.schema';

@ApiTags('Customer Types')
@Controller('customer-types')
export class CustomerTypesController {
  constructor(private readonly customerTypesService: CustomerTypesService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new customer type' })
  @ApiResponse({
    status: 201,
    description: 'Customer type created successfully.',
    type: Customer,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(
    @Body() createCustomerTypeDto: CreateCustomerTypeDto,
  ): Promise<Customer> {
    return this.customerTypesService.create(createCustomerTypeDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Customer type retrieved successfully.',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer type not found.' })
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerTypesService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customer types' })
  @ApiResponse({
    status: 200,
    description: 'Customer types retrieved successfully.',
    type: [Customer],
  })
  findAll(): Promise<Customer[]> {
    return this.customerTypesService.findAll();
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a customer type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Customer type updated successfully.',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer type not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerTypeDto: UpdateCustomerTypeDto,
  ): Promise<Customer> {
    return this.customerTypesService.update(id, updateCustomerTypeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a customer type by ID' })
  @ApiResponse({
    status: 204,
    description: 'Customer type deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Customer type not found.' })
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.customerTypesService.remove(id);
  }
}
