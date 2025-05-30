import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Container, ContainerDocument } from '../schemas/container.schema';
import { CreateContainerDto } from '../dtos/create-container.dto';
import { UpdateContainerDto } from '../dtos/update-container.dto';

@Injectable()
export class ContainerRepository {
  constructor(
    @InjectModel(Container.name)
    private containerModel: Model<ContainerDocument>,
  ) {}

  async create(data: CreateContainerDto): Promise<Container> {
    return new this.containerModel(data).save();
  }

  async findAll(
    page: number,
    limit: number,
    operationCode?: string,
    isoSizetype?: string,
    containerNo?: string,
  ): Promise<{ total: number; results: Container[] }> {
    const filter: {
      operationCode?: string;
      isoSizetype?: string;
      containerNo?: string;
    } = {};
    if (operationCode) {
      filter.operationCode = operationCode;
    }
    if (isoSizetype) {
      filter.isoSizetype = isoSizetype;
    }
    if (containerNo) {
      filter.containerNo = containerNo;
    }
    const total = await this.containerModel.countDocuments(filter);
    const skip = (page - 1) * limit;
    const results = await this.containerModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findOne(id: string): Promise<Container | null> {
    return this.containerModel.findById(id).exec();
  }

  async update(
    id: string,
    data: UpdateContainerDto,
  ): Promise<Container | null> {
    return this.containerModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Container | null> {
    return this.containerModel.findByIdAndDelete(id).exec();
  }

  async findByOperationCodeAndIsoSizetype(
    operationCode: string,
    isoSizetype: string,
  ): Promise<Container[]> {
    return await this.containerModel
      .find({ operationCode, isoSizetype })
      .lean();
  }
}
