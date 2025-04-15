import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class Class {
  @Prop({ required: true })
  classCode: string;

  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  classMappingCode: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
