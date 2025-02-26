import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  StuffUnstuff,
  StuffUnstuffDocument,
} from './schemas/stuff-unstuff.schema';
import { Model } from 'mongoose';
import { CreateStuffUnstuffDto } from './dto/create-stuff-unstuff.dto';
import { UpdateStuffUnstuffDto } from './dto/update-stuff-unstuff.dto';

@Injectable()
export class StuffUnstuffService {
  constructor(
    @InjectModel(StuffUnstuff.name)
    private readonly stuffUnstuffModel: Model<StuffUnstuffDocument>,
  ) {}

  async createStuffUnstuff(createStuffUnstuffDto: CreateStuffUnstuffDto) {
    return await this.stuffUnstuffModel.create(createStuffUnstuffDto);
  }

  async findAllStuffUnstuffs(page = 1, limit = 22) {
    const total = await this.stuffUnstuffModel.countDocuments();
    const results = await this.stuffUnstuffModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return { page, limit, total, results };
  }

  async findByIdStuffUnstuff(id: string) {
    const item = await this.stuffUnstuffModel.findById(id);
    if (!item) throw new NotFoundException('StuffUnstuff not found');
    return item;
  }

  async updateStuffUnstuff(
    id: string,
    updateStuffUnstuffDto: UpdateStuffUnstuffDto,
  ) {
    const updatedItem = await this.stuffUnstuffModel.findByIdAndUpdate(
      id,
      updateStuffUnstuffDto,
      {
        new: true,
      },
    );
    if (!updatedItem) throw new NotFoundException('StuffUnstuff not found');
    return updatedItem;
  }

  async deleteStuffUnstuff(id: string) {
    const deletedItem = await this.stuffUnstuffModel.findByIdAndDelete(id);
    if (!deletedItem) throw new NotFoundException('StuffUnstuff not found');
    return { message: 'Deleted successfully' };
  }
}
