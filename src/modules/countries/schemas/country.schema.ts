import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ timestamps: true })
export class Country {
  @Prop({ required: true, unique: true })
  countryCode: string;

  @Prop({ required: true })
  countryName: string;

  @Prop({ required: true })
  taxID: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
