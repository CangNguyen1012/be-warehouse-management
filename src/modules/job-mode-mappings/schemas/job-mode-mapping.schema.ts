import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobModeMappingDocument = JobModeMapping & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
})
export class JobModeMapping {
  @Prop({ required: true })
  jobModeCode: string;

  @Prop({ required: false })
  classCode?: string;

  @Prop({ required: false })
  classCodeMapping: string;

  @Prop({ required: true })
  jobModeCodeMapping: string;
}

export const JobModeMappingSchema =
  SchemaFactory.createForClass(JobModeMapping);
