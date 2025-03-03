import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Refer, ReferDocument } from './schemas/refer.schema';
import { CreateReferDto } from './dto/create-refer.dto';
import { UpdateReferDto } from './dto/update-refer.dto';

@Injectable()
export class ReferService {
  constructor(
    @InjectModel(Refer.name) private referModel: Model<ReferDocument>,
  ) {}

  //convert date to UTC-7 for storage
  private adjustToUTCMinus7(date: Date): Date {
    return new Date(date.getTime() - 14 * 60 * 60 * 1000);
  }

  //convert date from UTC-7 back to UTC+0 for FE
  private adjustToUTC(date: Date): Date {
    return new Date(date.getTime() + 14 * 60 * 60 * 1000);
  }

  //Create a new refer record
  async create(createReferDto: CreateReferDto): Promise<Refer> {
    const createdRefer = new this.referModel({
      ...createReferDto,
      applyDate: this.adjustToUTCMinus7(new Date(createReferDto.applyDate)),
      expireDate: this.adjustToUTCMinus7(new Date(createReferDto.expireDate)),
    });
    return createdRefer.save();
  }

  // Get all refer records
  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    total: number;
    page: number;
    limit: number;
    results: Refer[];
  }> {
    const skip = (page - 1) * limit;
    const total = await this.referModel.countDocuments();
    const refers = await this.referModel.find().skip(skip).limit(limit).exec();

    return {
      total,
      page,
      limit,
      results: refers.map((refer) => ({
        ...refer.toObject(),
        applyDate: this.adjustToUTC(refer.applyDate),
        expireDate: this.adjustToUTC(refer.expireDate),
      })),
    };
  }

  // Get a specific refer record by id
  async findOne(id: string): Promise<Refer> {
    const refer = await this.referModel.findById(id).exec();
    if (!refer) {
      throw new NotFoundException(`Refer with ID ${id} not found`);
    }
    return {
      ...refer.toObject(),
      applyDate: this.adjustToUTC(refer.applyDate),
      expireDate: this.adjustToUTC(refer.expireDate),
    };
  }

  // Update a refer record
  async update(id: string, updateReferDto: UpdateReferDto): Promise<Refer> {
    const updatedRefer = await this.referModel.findByIdAndUpdate(
      id,
      {
        ...updateReferDto,
        applyDate: updateReferDto.applyDate
          ? this.adjustToUTCMinus7(new Date(updateReferDto.applyDate))
          : undefined,
        expireDate: updateReferDto.expireDate
          ? this.adjustToUTCMinus7(new Date(updateReferDto.expireDate))
          : undefined,
      },
      { new: true },
    );
    if (!updatedRefer) {
      throw new NotFoundException(`Refer with ID ${id} not found`);
    }
    return {
      ...updatedRefer.toObject(),
      applyDate: this.adjustToUTC(updatedRefer.applyDate),
      expireDate: this.adjustToUTC(updatedRefer.expireDate),
    };
  }

  //Delete a refer record
  async remove(id: string): Promise<void> {
    const result = await this.referModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Refer with ID ${id} not found`);
  }
}
