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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';

@ApiTags('Payment Methods')
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment method' })
  @ApiResponse({
    status: 201,
    description: 'Payment method created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.paymentMethodsService.createPaymentMethod(
      createPaymentMethodDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all payment methods' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Payment methods retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ) {
    return await this.paymentMethodsService.findAllPaymentMethods(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment method by id' })
  @ApiResponse({
    status: 200,
    description: 'Payment method retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findById(@Param('id') id: string) {
    return await this.paymentMethodsService.findPaymentMethodById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a payment method by id' })
  @ApiResponse({
    status: 200,
    description: 'Payment method updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Payment method not found' })
  async update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: CreatePaymentMethodDto,
  ) {
    return await this.paymentMethodsService.updatePaymentMethod(
      id,
      updatePaymentMethodDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment method by id' })
  @ApiResponse({
    status: 200,
    description: 'Payment method deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Payment method not found' })
  async delete(@Param('id') id: string) {
    return await this.paymentMethodsService.deletePaymentMethod(id);
  }
}
