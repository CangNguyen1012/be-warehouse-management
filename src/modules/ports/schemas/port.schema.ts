import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortDocument = Port & Document;
@Schema()
export class Port {
  @Prop({ required: true, unique: true })
  portCode: string;
  @Prop({ required: true, unique: true })
  portName: string;
}

export const PortSchema = SchemaFactory.createForClass(Port);
