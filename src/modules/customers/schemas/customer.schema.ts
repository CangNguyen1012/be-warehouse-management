import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class Customer {
  @Prop({ required: true })
  customerTypeCode: string;

  @Prop({ required: true })
  customerCode: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  taxcode: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false, default: null })
  represent: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: true })
  moneyCredit: string;

  @Prop({ required: false, default: null })
  operationCode: string;

  @Prop({ required: false, default: null })
  customerLevelCode: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  languageCode: string;

  @Prop({ required: false, default: 0 })
  isPosted: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
