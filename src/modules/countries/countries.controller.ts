import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Country } from './schemas/country.schema';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CreateCountryDto } from './dto/create-country.dto';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a country' })
  @ApiResponse({ status: 201, description: 'Country created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  async create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return await this.countriesService.createCountry(createCountryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'Countries retrieved successfully' })
  async findAll(): Promise<Country[]> {
    return await this.countriesService.findAllCountries();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by ID' })
  @ApiResponse({ status: 200, description: 'Country found successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  async findOne(@Param('id') id: string): Promise<Country> {
    return await this.countriesService.findOneCountry(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a country' })
  @ApiResponse({ status: 200, description: 'Country updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    return await this.countriesService.updateCountry(id, updateCountryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country' })
  @ApiResponse({ status: 200, description: 'Country deleted successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.countriesService.removeCountry(id);
    return { message: 'Country deleted successfully' };
  }
}
