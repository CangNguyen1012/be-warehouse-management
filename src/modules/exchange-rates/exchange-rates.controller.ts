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
import { ExchangeRatesService } from './exchange-rates.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@ApiTags('Exchange Rates')
@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private exchangeRatesService: ExchangeRatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exchange rate' })
  @ApiResponse({
    status: 201,
    description: 'Exchange rate created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
    return await this.exchangeRatesService.createExchangeRate(
      createExchangeRateDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all exchange rates' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Exchange rates retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ) {
    return await this.exchangeRatesService.findAllExchangeRates(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exchange rate by id' })
  @ApiResponse({
    status: 200,
    description: 'Exchange rate retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findById(@Param('id') id: string) {
    return await this.exchangeRatesService.findExchangeRateById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an exchange rate by id' })
  @ApiResponse({
    status: 200,
    description: 'Exchange rate updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Exchange rate not found' })
  async update(
    @Param('id') id: string,
    @Body() updateExchangeRateDto: UpdateExchangeRateDto,
  ) {
    return await this.exchangeRatesService.updateExchangeRate(
      id,
      updateExchangeRateDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exchange rate by id' })
  @ApiResponse({
    status: 200,
    description: 'Exchange rate deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Exchange rate not found' })
  async delete(@Param('id') id: string) {
    return await this.exchangeRatesService.deleteExchangeRate(id);
  }
}
