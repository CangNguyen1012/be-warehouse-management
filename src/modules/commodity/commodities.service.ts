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
    private readonly commodityModel: Model<CommodityDocument>,
  ) {}

  async create(createCommodityDto: CreateCommodityDto) {
    return this.commodityModel.create(createCommodityDto);
  }

  async findAll(page = 1, limit = 16) {
    const total = await this.commodityModel.countDocuments().exec();
    const results = await this.commodityModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    return {
      statusCode: 200,
      data: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        results,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async findById(id: string) {
    const commodity = await this.commodityModel.findById(id).exec();
    if (!commodity) throw new NotFoundException('Commodity not found');
    return commodity;
  }

  async update(id: string, updateCommodityDto: UpdateCommodityDto) {
    const updatedCommodity = await this.commodityModel
      .findByIdAndUpdate(id, updateCommodityDto, { new: true })
      .exec();

    if (!updatedCommodity) throw new NotFoundException('Commodity not found');
    return updatedCommodity;
  }

  async delete(id: string) {
    const deletedCommodity = await this.commodityModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCommodity) throw new NotFoundException('Commodity not found');
    return { message: 'Commodity deleted successfully' };
  }
}
