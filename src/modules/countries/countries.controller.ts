import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Country } from './schemas/country.schema';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a country' })
  @ApiResponse({ status: 201, description: 'Country created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countriesService.createCountry(createCountryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'Countries found successfully' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll(): Promise<Country[]> {
    return this.countriesService.findAllCountries();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by id' })
  @ApiResponse({ status: 200, description: 'Country found successfully' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id') id: string): Promise<Country> {
    return this.countriesService.findOneCountry(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a country' })
  @ApiResponse({ status: 200, description: 'Country updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    return this.countriesService.updateCountry(id, updateCountryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country' })
  @ApiResponse({ status: 200, description: 'Country deleted successfully' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.countriesService.removeCountry(id);
  }
}
