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

  @Prop()
  expDate: Date;

  @Prop()
  operationCode: string;

  @Prop()
  localSizeType: string;

  @Prop()
  isoSizeType: string;

  @Prop()
  bookingAmount: string;

  @Prop()
  stackingAmount: string;

  @Prop()
  containerNo: string;

  @Prop()
  vesselKey?: string;

  @Prop()
  vesselImvoy?: string;

  @Prop()
  vesselExvoy?: string;

  @Prop()
  pol?: string;

  @Prop()
  pod?: string;

  @Prop()
  fpod?: string;

  @Prop()
  commodity: string;

  @Prop()
  temperature?: number;

  @Prop()
  vent?: number;

  @Prop()
  ventUnit?: string;

  @Prop()
  bookingClass?: string;

  @Prop()
  unno?: string;

  @Prop()
  oogTop?: number;

  @Prop()
  oogLeft?: number;

  @Prop()
  oogRight?: number;

  @Prop()
  oogBack?: number;

  @Prop()
  oogFront?: number;

  @Prop()
  o2?: number;

  @Prop()
  co2?: string;

  @Prop()
  note?: string;

  @Prop()
  vesselName: string;

  @Prop()
  shipperName?: string;

  @Prop()
  humidity?: number;

  @Prop()
  userGroupRank?: number;

  @Prop()
  type?: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
