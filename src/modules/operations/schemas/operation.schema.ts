import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OperationDocument = Operation & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class Operation {
  @Prop({ required: true })
  operationCode: string;

  @Prop({ required: true })
  operationName: string;

  @Prop()
  isEdo: boolean;

  @Prop()
  isActive: boolean;

  @Prop()
  edoNote: boolean;

  @Prop()
  isLocalForeign?: string;

  @Prop()
  moneyCredit?: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
