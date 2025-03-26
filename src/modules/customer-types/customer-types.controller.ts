import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomerTypesService } from './customer-types.service';
import { CreateCustomerTypeDto } from './dto/create-customer-types.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-types.dto';
import { CustomerType } from './schemas/customer-type.schema';

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
    type: CustomerType,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(
    @Body() createCustomerTypeDto: CreateCustomerTypeDto,
  ): Promise<CustomerType> {
    return this.customerTypesService.createCustomerType(createCustomerTypeDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Customer type retrieved successfully.',
    type: CustomerType,
  })
  @ApiResponse({ status: 404, description: 'Customer type not found.' })
  findOne(@Param('id') id: string): Promise<CustomerType> {
    return this.customerTypesService.findOneCustomerType(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customer types' })
  @ApiResponse({
    status: 200,
    description: 'Customer types retrieved successfully.',
    type: [CustomerType],
  })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.customerTypesService.findAllCustomerTypes(page, limit);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a customer type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Customer type updated successfully.',
    type: CustomerType,
  })
  @ApiResponse({ status: 404, description: 'Customer type not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerTypeDto: UpdateCustomerTypeDto,
  ): Promise<CustomerType> {
    return this.customerTypesService.updateCustomerType(
      id,
      updateCustomerTypeDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a customer type by ID' })
  @ApiResponse({
    status: 204,
    description: 'Customer type deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Customer type not found.' })
  remove(@Param('id') id: string) {
    return this.customerTypesService.deleteCustomerType(id);
  }
}
