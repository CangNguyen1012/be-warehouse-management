import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReferDocument = Refer & Document;

@Schema({ timestamps: true })
export class Refer {
  @Prop({ required: true })
  operationCode: string;

  @Prop({ required: true })
  refName: string;

  // ✅ Explicitly define optional string fields to allow null values
  @Prop({ type: String, default: null })
  laneCode?: string | null;

  @Prop({ type: String, default: null })
  vesselCode?: string | null;

  @Prop({ type: String, default: null })
  customerCode?: string | null;

  @Prop({ type: String, default: null })
  isLocalForeign?: string | null;

  @Prop({
    type: Date,
    get: (val: Date) => adjustToUTCMinus7(val),
    set: (val: Date) => val,
  })
  applyDate: Date;

  @Prop({
    type: Date,
    get: (val: Date) => adjustToUTCMinus7(val),
    set: (val: Date) => val,
  })
  expireDate: Date;

  @Prop({ type: String, default: null })
  classCode?: string | null;

  @Prop({ type: String, default: null })
  pluginTime?: string | null;

  @Prop({ type: String, default: null })
  unplugTime?: string | null;

  @Prop({ required: true })
  rounding: string;

  @Prop({ required: true })
  moneyCredit: string;

  @Prop({ required: true })
  hourAdding: number;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ type: Date, default: null })
  createdTime?: Date;
}

// Adjust to UTC-7
function adjustToUTCMinus7(date: Date): Date {
  return new Date(date.getTime() - 7 * 60 * 60 * 1000);
}

export const ReferSchema = SchemaFactory.createForClass(Refer);
