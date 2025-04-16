import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TerminalDocument = Terminal & Document;

@Schema()
export class Terminal {
  @Prop({ default: false })
  importPickupAllCont: boolean;

  @Prop({ default: false })
  depotSelect: boolean;

  @Prop({ default: false })
  holidaySelect: boolean;

  @Prop({ required: true })
  terminalName: string;

  @Prop({ default: false })
  autoActiveUser: boolean;

  @Prop({ required: true })
  terminalNameEng: string;

  @Prop({ required: true })
  shortTerminalName: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  vat: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ default: '' })
  tel: string;

  @Prop({ default: '' })
  fax: string;

  @Prop({ default: '' })
  web: string;

  @Prop({ default: '' })
  hotlineInfo: string;
}

export const TerminalSchema = SchemaFactory.createForClass(Terminal);
