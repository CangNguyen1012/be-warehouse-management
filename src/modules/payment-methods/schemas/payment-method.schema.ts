import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentMethodDocument = PaymentMethod & Document;

@Schema()
export class PaymentMethod {
  @Prop({ required: true })
  sort: number;

  @Prop({ required: false, default: 'HAT' })
  terminalCode: string;

  @Prop({ required: true })
  partnerCode: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: false, default: 1 })
  type: number;

  @Prop({ required: false, default: 0 })
  minAmount: number;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
