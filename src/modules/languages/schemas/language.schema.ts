import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Language extends Document {
  @Prop({ required: true, unique: true })
  languageCode: string;

  @Prop({ required: true })
  languageName: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
