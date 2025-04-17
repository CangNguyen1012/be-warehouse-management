import { Module } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { ExchangeRatesController } from './exchange-rates.controller';
import { ExchangeRateRepository } from './repository/exchange-rate.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExchangeRate,
  ExchangeRateSchema,
} from './schemas/exchange-rate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExchangeRate.name, schema: ExchangeRateSchema },
    ]),
  ],
  providers: [ExchangeRatesService, ExchangeRateRepository],
  controllers: [ExchangeRatesController],
})
export class ExchangeRatesModule {}
