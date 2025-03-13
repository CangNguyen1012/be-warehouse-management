import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommodityDocument = Commodity & Document;

@Schema({ timestamps: true })
export class Commodity {
  @Prop({ required: true })
  commodityCode: string;

  @Prop({ required: true })
  commodityName: string;
}

export const CommoditySchema = SchemaFactory.createForClass(Commodity);
