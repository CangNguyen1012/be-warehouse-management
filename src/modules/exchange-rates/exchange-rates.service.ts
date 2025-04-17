import { Injectable } from '@nestjs/common';
import { ExchangeRateRepository } from './repository/exchange-rate.repository';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@Injectable()
export class ExchangeRatesService {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async createExchangeRate(createExchangeRateDto: CreateExchangeRateDto) {
    return await this.exchangeRateRepository.create(createExchangeRateDto);
  }

  async findAllExchangeRates(page: number = 1, limit: number) {
    const { total, results } = await this.exchangeRateRepository.findAll(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findExchangeRateById(id: string) {
    const exchangeRate = await this.exchangeRateRepository.findOne(id);
    return exchangeRate;
  }

  async updateExchangeRate(
    id: string,
    updateExchangeRateDto: UpdateExchangeRateDto,
  ) {
    const updatedExchangeRate = await this.exchangeRateRepository.update(
      id,
      updateExchangeRateDto,
    );
    return updatedExchangeRate;
  }

  async deleteExchangeRate(id: string) {
    const deletedExchangeRate = await this.exchangeRateRepository.remove(id);
    return deletedExchangeRate;
  }
}
