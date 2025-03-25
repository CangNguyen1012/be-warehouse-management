import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContainerDocument = Container & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class Container {
  @Prop({ required: false, default: null })
  idTos?: string;

  @Prop({ required: false, default: null })
  idCont?: number;

  @Prop({ required: true })
  vesselKey: string;

  @Prop({ required: false, default: null })
  vesselImvoy?: string;

  @Prop({ required: false, default: null })
  vesselExvoy?: string;

  @Prop({ required: false, default: null })
  etb?: Date;

  @Prop({ required: false, default: null })
  etd?: Date;

  @Prop({ required: false, default: null })
  bargeKey?: string;

  @Prop({ required: false, default: null })
  bargeImvoy?: string;

  @Prop({ required: false, default: null })
  bargeExvoy?: string;

  @Prop({ required: false, default: null })
  deliveryOrder?: string;

  @Prop({ required: false, default: null })
  blNo?: string;

  @Prop({ required: false, default: null })
  bookingNo?: string;

  @Prop({ required: false, default: null })
  housebillNo?: string;

  @Prop({ required: true })
  containerNo: string;

  @Prop({ required: true })
  classCode: string;

  @Prop({ required: true })
  operationCode: string;

  @Prop({ required: true })
  fe: string;

  @Prop({ required: true })
  containerStatusCode: string;

  @Prop({ required: false, default: null })
  containerCondition?: string;

  @Prop({ required: true })
  cargoTypeCode: string;

  @Prop({ required: false, default: null })
  commodity?: string;

  @Prop({ required: true })
  localSizetype: string;

  @Prop({ required: true })
  isoSizetype: string;

  @Prop({ required: true })
  isLocalForeign: string;

  @Prop({ required: false, default: null })
  jobModeCodeIn?: string;

  @Prop({ required: false, default: null })
  methodCodeIn?: string;

  @Prop({ required: false, default: null })
  dateIn?: Date;

  @Prop({ required: false, default: null })
  dateOut?: Date;

  @Prop({ required: false, default: null })
  jobModeCodeOut?: string;

  @Prop({ required: false, default: null })
  methodCodeOut?: string;

  @Prop({ required: false, default: null })
  eirNoIn?: string;

  @Prop({ required: false, default: null })
  eirNoOut?: string;

  @Prop({ required: false, default: null })
  stuffNo?: string;

  @Prop({ required: false, default: null })
  unstuffNo?: string;

  @Prop({ required: false, default: null })
  serviceNo?: string;

  @Prop({ required: false, default: null })
  draftNo?: string;

  @Prop({ required: false, default: null })
  invoiceNo?: string;

  @Prop({ required: false, default: null })
  block?: string;

  @Prop({ required: false, default: null })
  bay?: string;

  @Prop({ required: false, default: null })
  row?: string;

  @Prop({ required: false, default: null })
  tier?: string;

  @Prop({ required: false, default: null })
  area?: string;

  @Prop({ required: false, default: null })
  vgm?: boolean;

  @Prop({ required: false, default: null })
  mcWeight?: number;

  @Prop({ required: false, default: null })
  tareWeight?: number;

  @Prop({ required: false, default: null })
  maxGrossWeight?: number;

  @Prop({ required: false, default: null })
  sealNo?: string;

  @Prop({ required: false, default: null })
  sealNo1?: string;

  @Prop({ required: false, default: null })
  sealNo2?: string;

  @Prop({ required: false, default: null })
  pol?: string;

  @Prop({ required: false, default: null })
  pod?: string;

  @Prop({ required: false, default: null })
  fpod?: string;

  @Prop({ required: false, default: null })
  transitCode?: string;

  @Prop({ required: false, default: null })
  transitPort?: string;

  @Prop({ required: false, default: null })
  temperature?: string;

  @Prop({ required: false, default: null })
  vent?: number;

  @Prop({ required: false, default: null })
  ventUnit?: string;

  @Prop({ required: false, default: null })
  containerClass?: string;

  @Prop({ required: false, default: null })
  unno?: string;

  @Prop({ required: false, default: null })
  oogTop?: number;

  @Prop({ required: false, default: null })
  oogLeft?: number;

  @Prop({ required: false, default: null })
  oogRight?: number;

  @Prop({ required: false, default: null })
  oogBack?: number;

  @Prop({ required: false, default: null })
  oogFront?: number;

  @Prop({ required: false, default: null })
  cusHold?: boolean;

  @Prop({ required: false, default: null })
  terHold?: boolean;

  @Prop({ required: false, default: null })
  terHoldReason?: string;

  @Prop({ required: false, default: null })
  isReturnBack?: boolean;

  @Prop({ required: false, default: null })
  isSpecialWarning?: boolean;

  @Prop({ required: false, default: null })
  specialWarning?: string;

  @Prop({ required: false, default: null })
  isTruckBarge?: string;

  @Prop({ required: false, default: null })
  truckNo?: string;

  @Prop({ required: false, default: null })
  remoocNo?: string;

  @Prop({ required: false, default: null })
  note?: string;
}

export const ContainerSchema = SchemaFactory.createForClass(Container);
