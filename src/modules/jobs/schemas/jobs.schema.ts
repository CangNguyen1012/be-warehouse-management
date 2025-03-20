import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class Job {
  @Prop({ required: true })
  jobCode: string;

  @Prop({ required: true })
  jobName: string;

  @Prop({ required: false, default: false })
  isQuay: boolean;

  @Prop({ required: false, default: false })
  isYard: boolean;

  @Prop({ required: false, default: false })
  isGate: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
