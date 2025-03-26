import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountriesRepository } from './repository/countries.repository';

@Injectable()
export class CountriesService {
  constructor(private countriesRepository: CountriesRepository) {}

  async createCountry(createCountryDto: CreateCountryDto) {
    return await this.countriesRepository.create(createCountryDto);
  }

  async findAllCountries(page: number, limit: number) {
    const { total, results } = await this.countriesRepository.findAll(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneCountry(id: string) {
    const country = await this.countriesRepository.findById(id);
    if (!country)
      throw new NotFoundException(`Country with ID ${id} not found`);
    return country;
  }

  async updateCountry(id: string, updateCountryDto: UpdateCountryDto) {
    return await this.countriesRepository.update(id, updateCountryDto);
  }

  async deleteCountry(id: string) {
    return await this.countriesRepository.delete(id);
  }
}
