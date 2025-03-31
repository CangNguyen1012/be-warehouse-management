import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImoDocument = Imo & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Imo {
  @Prop({ required: true })
  imdgClass: string;

  @Prop({ required: true })
  un: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  placard: string;
}

export const ImoSchema = SchemaFactory.createForClass(Imo);
