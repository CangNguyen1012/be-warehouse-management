import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ExchangeRate,
  ExchangeRateDocument,
} from '../schemas/exchange-rate.schema';
import { Model } from 'mongoose';
import { CreateExchangeRateDto } from '../dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from '../dto/update-exchange-rate.dto';

@Injectable()
export class ExchangeRateRepository {
  constructor(
    @InjectModel(ExchangeRate.name)
    private exchangeRateModel: Model<ExchangeRateDocument>,
  ) {}

  async create(
    createExchangeRateDto: CreateExchangeRateDto,
  ): Promise<ExchangeRate> {
    const createdExchangeRate = new this.exchangeRateModel(
      createExchangeRateDto,
    );
    return createdExchangeRate.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: ExchangeRate[] }> {
    const total = await this.exchangeRateModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.exchangeRateModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findOne(id: string): Promise<ExchangeRate | null> {
    return this.exchangeRateModel.findById(id).exec();
  }

  async update(
    id: string,
    updateExchangeRateDto: UpdateExchangeRateDto,
  ): Promise<ExchangeRate | null> {
    return this.exchangeRateModel
      .findByIdAndUpdate(id, updateExchangeRateDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ExchangeRate | null> {
    return await this.exchangeRateModel.findByIdAndDelete(id).exec();
  }
}
