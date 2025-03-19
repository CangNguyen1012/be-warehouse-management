import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Port, PortDocument } from './schemas/port.schema';
import { CreatePortDto } from './dtos/create-ports.dto';
import { UpdatePortDto } from './dtos/update-ports.dto';

@Injectable()
export class PortsService {
  constructor(@InjectModel(Port.name) private portModel: Model<PortDocument>) {}

  async create(createPortDto: CreatePortDto) {
    const createdPort = new this.portModel(createPortDto);
    return createdPort.save();
  }

  async findAll(page: number = 1, limit: number) {
    const total = await this.portModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.portModel.find().skip(skip).limit(limit);

    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string) {
    return await this.portModel.findById(id);
  }

  async update(id: string, updatePortDto: UpdatePortDto) {
    return this.portModel.findByIdAndUpdate(id, updatePortDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.portModel.findByIdAndDelete(id);
  }
}
