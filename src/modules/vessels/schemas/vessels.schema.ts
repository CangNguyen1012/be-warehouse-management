import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VesselDocument = Vessel & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class Vessel {
  @Prop({ required: true })
  terminalId: string;

  @Prop({ required: true })
  vesselType: string;

  @Prop({ required: true })
  vesselCode: string;

  @Prop({ required: true })
  vesselName: string;

  @Prop({ required: true })
  callSign: string;

  @Prop()
  imo: string;
}

export const VesselSchema = SchemaFactory.createForClass(Vessel);
