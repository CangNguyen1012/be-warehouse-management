import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StuffUnstuffDocument = StuffUnstuff & Document;

@Schema({
  timestamps: {
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  },
})
export class StuffUnstuff {
  @Prop({ required: true })
  jobModeCode: string;

  @Prop({ required: true })
  commodityCode: string;
}

export const StuffUnstuffSchema = SchemaFactory.createForClass(StuffUnstuff);
