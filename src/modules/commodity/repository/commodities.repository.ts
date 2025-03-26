import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Commodity, CommodityDocument } from '../schemas/commodity.schema';
import { Model } from 'mongoose';
import { CreateCommodityDto } from '../dto/create-commodity.dto';
import { UpdateCommodityDto } from '../dto/update-commodity.dto';

@Injectable()
export class CommoditiesRepository {
  constructor(
    @InjectModel(Commodity.name)
    private commodityModel: Model<CommodityDocument>,
  ) {}

  async create(createCommodityDto: CreateCommodityDto): Promise<Commodity> {
    return await this.commodityModel.create(createCommodityDto);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: Commodity[] }> {
    const total = await this.commodityModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.commodityModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<Commodity> {
    const commodity = await this.commodityModel.findById(id);
    if (!commodity)
      throw new NotFoundException(`Commodity with ID ${id} not found`);
    return commodity;
  }

  async update(id: string, updateCommodityDto: UpdateCommodityDto) {
    const updatedCommodity = await this.commodityModel.findByIdAndUpdate(
      id,
      updateCommodityDto,
      { new: true },
    );
    if (!updatedCommodity)
      throw new NotFoundException(`Commodity with ID ${id} not found`);
    return updatedCommodity;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.commodityModel.findByIdAndDelete(id);
    if (!deleted)
      throw new NotFoundException(`Commodity with ID ${id} not found`);
  }
}
