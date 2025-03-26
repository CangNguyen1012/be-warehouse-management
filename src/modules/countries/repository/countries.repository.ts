import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from '../schemas/country.schema';
import { CreateCountryDto } from '../dto/create-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';

@Injectable()
export class CountriesRepository {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    return await this.countryModel.create(createCountryDto);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: Country[] }> {
    const total = await this.countryModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.countryModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<Country> {
    const country = await this.countryModel.findById(id);
    if (!country)
      throw new NotFoundException(`Country with ID ${id} not found`);
    return country;
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    const updatedCountry = await this.countryModel.findByIdAndUpdate(
      id,
      updateCountryDto,
      { new: true },
    );
    if (!updatedCountry)
      throw new NotFoundException(`Country with ID ${id} not found`);
    return updatedCountry;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.countryModel.findByIdAndDelete(id);
    if (!deleted)
      throw new NotFoundException(`Country with ID ${id} not found`);
  }
}
