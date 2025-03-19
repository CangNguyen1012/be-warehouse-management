import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vessel, VesselDocument } from './schemas/vessels.schema';
import { CreateVesselDto } from './dtos/create-vessels.dto';
import { UpdateVesselDto } from './dtos/update-vessels.dto';

@Injectable()
export class VesselsService {
  constructor(
    @InjectModel(Vessel.name) private vesselModel: Model<VesselDocument>,
  ) {}

  async create(createVesselDto: CreateVesselDto) {
    const createdVessel = new this.vesselModel(createVesselDto);
    return createdVessel.save();
  }

  async findAll(page: number = 1, limit: number) {
    const total = await this.vesselModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.vesselModel.find().skip(skip).limit(limit);

    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string) {
    return await this.vesselModel.findById(id);
  }

  async update(id: string, updateVesselDto: UpdateVesselDto) {
    return await this.vesselModel.findByIdAndUpdate(id, updateVesselDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.vesselModel.findByIdAndDelete(id);
  }
}
