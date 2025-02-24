import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country, CountryDocument } from './schemas/country.schema';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    const createdCountry = new this.countryModel(createCountryDto);
    return createdCountry.save();
  }

  async findAllCountries(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findOneCountry(id: string): Promise<Country> {
    const country = await this.countryModel.findById(id).exec();
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  async updateCountry(
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    const updatedCountry = await this.countryModel
      .findByIdAndUpdate(id, updateCountryDto, { new: true })
      .exec();
    if (!updatedCountry) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return updatedCountry;
  }

  async removeCountry(id: string): Promise<void> {
    const result = await this.countryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }
}
