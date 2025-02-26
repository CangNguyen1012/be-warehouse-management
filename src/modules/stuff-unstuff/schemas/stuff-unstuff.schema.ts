import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StuffUnstuffDocument = StuffUnstuff & Document;

@Schema({ timestamps: true })
export class StuffUnstuff extends Document {
  @Prop({ required: true })
  jobModeCode: string;

  @Prop({ required: true })
  commodityCode: string;

  @Prop({ required: true })
  createdBy: string;
}

export const StuffUnstuffSchema = SchemaFactory.createForClass(StuffUnstuff);
