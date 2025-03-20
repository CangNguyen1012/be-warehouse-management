import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookindDocument = Booking & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class Booking {
  @Prop({ required: true })
  bookingNo: string;

  @Prop({ required: true })
  bookingDate: Date;

  @Prop()
  bookingType: number;

  @Prop({ required: true })
  bookingStatus: number;

  @Prop({ required: true })
  expDate: Date;

  @Prop({ required: true })
  operationCode: string;

  @Prop({ required: true })
  localSizeType: string;

  @Prop({ required: true })
  isoSizeType: string;

  @Prop({ required: true })
  bookingAmount: number;

  @Prop({ required: true })
  stackingAmount: number;

  @Prop({ required: false, default: null })
  containerNo?: string;

  @Prop({ required: false, default: null })
  vesselKey?: string;

  @Prop({ required: false, default: null })
  vesselImvoy?: string;

  @Prop({ required: false, default: null })
  vesselExvoy?: string;

  @Prop({ required: false, default: null })
  pol?: string;

  @Prop({ required: false, default: null })
  pod?: string;

  @Prop({ required: false, default: null })
  fpod?: string;

  @Prop({ required: false, default: null })
  commodity?: string;

  @Prop({ required: false, default: null })
  temperature?: number;

  @Prop({ required: false, default: null })
  vent?: number;

  @Prop({ required: false, default: null })
  ventUnit?: string;

  @Prop({ required: false, default: null })
  bookingClass?: string;

  @Prop({ required: false, default: null })
  unno?: string;

  @Prop({ required: false, default: null })
  oogTop?: string;

  @Prop({ required: false, default: null })
  oogLeft?: string;

  @Prop({ required: false, default: null })
  oogRight?: string;

  @Prop({ required: false, default: null })
  oogBack?: string;

  @Prop({ required: false, default: null })
  oogFront?: string;

  @Prop({ required: false, default: null })
  o2?: string;

  @Prop({ required: false, default: null })
  co2?: string;

  @Prop({ required: false, default: '' })
  note?: string;

  @Prop({ required: false, default: null })
  vesselName?: string;

  @Prop({ required: false, default: '' })
  shipperName?: string;

  @Prop({ required: false, default: null })
  humidity?: string;

  @Prop({ required: false, default: null })
  userGroupRank?: number;

  @Prop({ required: false })
  type: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
