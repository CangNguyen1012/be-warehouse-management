import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReferDocument = Refer & Document;

@Schema({ timestamps: true })
export class Refer {
  @Prop({ required: true })
  operationCode: string;

  @Prop({
    type: Date,
    get: (val: Date) => val,
    set: (val: Date) => val,
  })
  applyDate: Date;

  @Prop({
    type: Date,
    get: (val: Date) => val,
    set: (val: Date) => val,
  })
  expireDate: Date;

  @Prop({ required: true })
  rounding: string;

  @Prop({ required: true })
  moneyCredit: string;

  @Prop({ required: true })
  hourAdding: number;
}

export const ReferSchema = SchemaFactory.createForClass(Refer);
