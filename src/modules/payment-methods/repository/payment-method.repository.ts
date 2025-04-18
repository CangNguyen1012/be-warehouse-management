import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaymentMethod,
  PaymentMethodDocument,
} from '../schemas/payment-method.schema';
import { Model } from 'mongoose';
import { CreatePaymentMethodDto } from '../dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodRepository {
  constructor(
    @InjectModel(PaymentMethod.name)
    private paymentMethodModel: Model<PaymentMethodDocument>,
  ) {}

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = new this.paymentMethodModel(createPaymentMethodDto);
    return paymentMethod.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: PaymentMethod[] }> {
    const total = await this.paymentMethodModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.paymentMethodModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();
    return { total, results };
  }

  async findById(id: string): Promise<PaymentMethod | null> {
    return this.paymentMethodModel.findById(id).lean();
  }

  async update(
    id: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod | null> {
    return await this.paymentMethodModel.findByIdAndUpdate(
      id,
      updatePaymentMethodDto,
      {
        new: true,
        lean: true,
      },
    );
  }

  async delete(id: string): Promise<PaymentMethod | null> {
    return await this.paymentMethodModel.findByIdAndDelete(id).lean();
  }
}
