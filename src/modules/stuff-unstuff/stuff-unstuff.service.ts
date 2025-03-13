import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  StuffUnstuff,
  StuffUnstuffDocument,
} from './schemas/stuff-unstuff.schema';
import { CreateStuffUnstuffDto } from './dto/create-stuff-unstuff.dto';
import { UpdateStuffUnstuffDto } from './dto/update-stuff-unstuff.dto';

@Injectable()
export class StuffUnstuffService {
  constructor(
    @InjectModel(StuffUnstuff.name)
    private readonly stuffUnstuffModel: Model<StuffUnstuffDocument>,
  ) {}

  async createStuffUnstuff(createDto: CreateStuffUnstuffDto) {
    return await this.stuffUnstuffModel.create(createDto);
  }

  async findAllStuffUnstuffs(page = 1, limit = 22) {
    const total = await this.stuffUnstuffModel.countDocuments();
    const results = await this.stuffUnstuffModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      statusCode: 200,
      data: { page, limit, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findByIdStuffUnstuff(id: string) {
    const item = await this.stuffUnstuffModel.findById(id);
    if (!item) throw new NotFoundException('StuffUnstuff record not found');
    return item;
  }

  async updateStuffUnstuff(id: string, updateDto: UpdateStuffUnstuffDto) {
    const updatedItem = await this.stuffUnstuffModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );
    if (!updatedItem)
      throw new NotFoundException('StuffUnstuff record not found');
    return updatedItem;
  }

  async deleteStuffUnstuff(id: string) {
    const deletedItem = await this.stuffUnstuffModel.findByIdAndDelete(id);
    if (!deletedItem)
      throw new NotFoundException('StuffUnstuff record not found');
    return {
      statusCode: 200,
      message: 'Deleted successfully',
      timestamp: new Date().toISOString(),
    };
  }
}
