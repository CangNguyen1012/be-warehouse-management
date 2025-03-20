import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SizeTypeDocument = SizeType & Document;

@Schema({ timestamps: true })
export class SizeType {
  @Prop({ required: true })
  operationCode: string;

  @Prop({ required: true })
  localSizetype: string;

  @Prop({ required: true })
  isoSizetype: string;

  @Prop({ required: true })
  cargoTypeCode: string;

  @Prop({ required: true })
  emptyCargoTypeCode: string;
}

export const SizeTypeSchema = SchemaFactory.createForClass(SizeType);
