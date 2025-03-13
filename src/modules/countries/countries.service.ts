import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country, CountryDocument } from './schemas/country.schema';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,
  ) {}

  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryModel.create(createCountryDto);
  }

  async findAllCountries(): Promise<Country[]> {
    return this.countryModel.find();
  }

  async findOneCountry(id: string): Promise<Country> {
    const country = await this.countryModel.findById(id);
    if (!country)
      throw new NotFoundException(`Country with ID ${id} not found`);
    return country;
  }

  async updateCountry(
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    const updatedCountry = await this.countryModel.findByIdAndUpdate(
      id,
      updateCountryDto,
      {
        new: true,
      },
    );
    if (!updatedCountry)
      throw new NotFoundException(`Country with ID ${id} not found`);
    return updatedCountry;
  }

  async removeCountry(id: string): Promise<{ message: string }> {
    const deletedCountry = await this.countryModel.findByIdAndDelete(id);
    if (!deletedCountry)
      throw new NotFoundException(`Country with ID ${id} not found`);
    return { message: 'Country deleted successfully' };
  }
}
