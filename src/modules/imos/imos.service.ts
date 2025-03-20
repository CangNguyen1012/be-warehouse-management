import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Imo, ImoDocument } from './schemas/imo.schema';
import { Model } from 'mongoose';
import { CreateImoDto } from './dtos/create-imo.dto';
import { UpdateImoDto } from './dtos/update-imo.dto';

@Injectable()
export class ImosService {
  constructor(@InjectModel(Imo.name) private imoModel: Model<ImoDocument>) {}

  async create(createImoDto: CreateImoDto) {
    const createdImo = new this.imoModel(createImoDto);
    return createdImo.save();
  }

  async findAll(page: number = 1, limit: number) {
    const total = await this.imoModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.imoModel.find().skip(skip).limit(limit);

    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string) {
    return await this.imoModel.findById(id);
  }

  async update(id: string, updateImoDto: UpdateImoDto) {
    return await this.imoModel.findByIdAndUpdate(id, updateImoDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.imoModel.findByIdAndDelete(id);
  }
}
