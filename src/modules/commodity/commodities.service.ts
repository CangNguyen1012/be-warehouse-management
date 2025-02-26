import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Commodity, CommodityDocument } from './schemas/commodity.schema';
import { Model } from 'mongoose';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';

@Injectable()
export class CommoditiesService {
  constructor(
    @InjectModel(Commodity.name)
    private commodityModel: Model<CommodityDocument>,
  ) {}

  async createCommodity(createCommodityDto: CreateCommodityDto) {
    return await this.commodityModel.create(createCommodityDto);
  }

  async findAllCommodities(page = 1, limit = 16) {
    const total = await this.commodityModel.countDocuments();
    const results = await this.commodityModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return { page, limit, total, results };
  }

  async findByIdCommodity(id: string) {
    const commodity = await this.commodityModel.findById(id);
    if (!commodity) throw new NotFoundException('Commodity not found');
    return commodity;
  }

  async updateCommodity(id: string, updateCommodityDto: UpdateCommodityDto) {
    const updatedCommodity = await this.commodityModel.findByIdAndUpdate(
      id,
      updateCommodityDto,
      {
        new: true,
      },
    );
    if (!updatedCommodity) throw new NotFoundException('Commodity not found');
    return updatedCommodity;
  }

  async deleteCommodity(id: string) {
    const deletedCommodity = await this.commodityModel.findByIdAndDelete(id);
    if (!deletedCommodity) throw new NotFoundException('Commodity not found');
    return deletedCommodity;
  }
}
