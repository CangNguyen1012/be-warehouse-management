import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  StuffUnstuff,
  StuffUnstuffDocument,
} from '../schemas/stuff-unstuff.schema';
import { Model } from 'mongoose';
import { CreateStuffUnstuffDto } from '../dto/create-stuff-unstuff.dto';
import { UpdateStuffUnstuffDto } from '../dto/update-stuff-unstuff.dto';

@Injectable()
export class StuffUnstuffsRepository {
  private readonly logger = new Logger(StuffUnstuffsRepository.name);

  constructor(
    @InjectModel(StuffUnstuff.name)
    private stuffunstuffModel: Model<StuffUnstuffDocument>,
  ) {}

  async create(
    createStuffUnstuffDto: CreateStuffUnstuffDto,
  ): Promise<StuffUnstuff> {
    this.logger.log(
      `Creating a new stuff-unstuff: ${JSON.stringify(createStuffUnstuffDto)}`,
    );
    const createdStuffUnstuff = new this.stuffunstuffModel(
      createStuffUnstuffDto,
    );
    return createdStuffUnstuff.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: StuffUnstuff[] }> {
    const total = await this.stuffunstuffModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.stuffunstuffModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<StuffUnstuff | null> {
    this.logger.log(`Finding stuff-unstuff with id: ${id}`);
    return this.stuffunstuffModel.findById(id).lean();
  }

  async update(
    id: string,
    updateStuffUnstuffDto: UpdateStuffUnstuffDto,
  ): Promise<StuffUnstuff | null> {
    this.logger.log(
      `Updating stuff-unstuff with id: ${id} with data: ${JSON.stringify(
        updateStuffUnstuffDto,
      )}`,
    );
    return await this.stuffunstuffModel.findByIdAndUpdate(
      id,
      updateStuffUnstuffDto,
      { new: true, lean: true },
    );
  }

  async delete(id: string): Promise<StuffUnstuff | null> {
    this.logger.warn(`Deleting stuff-unstuff with id: ${id}`);
    return await this.stuffunstuffModel.findByIdAndDelete(id).lean();
  }
}
