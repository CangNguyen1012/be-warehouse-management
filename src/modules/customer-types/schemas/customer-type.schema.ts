import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerTypeDocument = CustomerType & Document;

@Schema({ timestamps: { createdAt: 'createdTime', updatedAt: 'modifiedTime' } })
export class CustomerType extends Document {
  @Prop({ required: true, unique: true })
  customerTypeCode: string;

  @Prop({ required: true, unique: true })
  customerTypeName: string;

  @Prop({ required: true })
  userGroupRank: number;

  @Prop({ required: true })
  createdBy: string;

  @Prop()
  createdTime: Date;

  @Prop({ required: true })
  modifiedBy: string;

  @Prop()
  modifiedTime: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerType);
