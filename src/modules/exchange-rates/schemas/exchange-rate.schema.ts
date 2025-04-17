import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExchangeRateDocument = ExchangeRate & Document;
@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class ExchangeRate {
  @Prop({ required: true })
  currencyCode: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  dateOfRate: Date;

  @Prop({ required: true, default: false })
  isActive: boolean;
}

export const ExchangeRateSchema = SchemaFactory.createForClass(ExchangeRate);
