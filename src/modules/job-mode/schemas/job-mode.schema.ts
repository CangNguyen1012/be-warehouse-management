import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobModeDocument = JobMode & Document;

@Schema({ timestamps: true })
export class JobMode {
  @Prop({ required: true })
  jobModeCode: string;

  @Prop({ required: true })
  jobModeName: string;

  @Prop({ default: false })
  isLoLo: boolean;

  @Prop({ default: false })
  isCfsStuff: boolean;

  @Prop({ default: false })
  isCfsUnstuff: boolean;

  @Prop({ default: false })
  isCfsChange: boolean;

  @Prop({ default: false })
  isServiceYard: boolean;

  @Prop({ default: false })
  isServiceNoncont: boolean;

  @Prop({ default: 0 })
  extraMode: number;

  @Prop({ required: true })
  createdBy: string;

  @Prop()
  modifiedBy?: string;
}

export const JobModeSchema = SchemaFactory.createForClass(JobMode);
