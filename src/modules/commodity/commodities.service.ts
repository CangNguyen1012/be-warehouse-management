import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';
import { CommoditiesRepository } from './repository/commodities.repository';

@Injectable()
export class CommoditiesService {
  constructor(private commoditiesRepository: CommoditiesRepository) {}

  async createCommodity(createCommodityDto: CreateCommodityDto) {
    return await this.commoditiesRepository.create(createCommodityDto);
  }

  async findAllCommodities(page: number, limit: number) {
    const { total, results } = await this.commoditiesRepository.findAll(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data: {
        page,
        limit: total,
        total,
        results,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneCommodity(id: string) {
    const commodity = await this.commoditiesRepository.findById(id);
    if (!commodity)
      throw new NotFoundException(`Commodity with ID ${id} not found`);
    return commodity;
  }

  async updateCommodity(id: string, updateCommodityDto: UpdateCommodityDto) {
    return await this.commoditiesRepository.update(id, updateCommodityDto);
  }

  async deleteCommodity(id: string) {
    return await this.commoditiesRepository.delete(id);
  }
}
