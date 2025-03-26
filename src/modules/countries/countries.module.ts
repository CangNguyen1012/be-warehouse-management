import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountriesRepository } from './repository/countries.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesRepository],
})
export class CountriesModule {}
