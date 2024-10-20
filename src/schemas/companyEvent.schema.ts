import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from './company.schema';

export type CompanyEventDocument = CompanyEvent & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class CompanyEvent {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  CompanyId: Company;
  @Prop({ required: true })
  Title: string;
  @Prop({ required: false })
  Description: string;
  @Prop({ required: true })
  StartDate: Date;
  @Prop({ required: true })
  EndDate: Date;
  @Prop({ default: Date.now })
  CreatedAt: Date;
}

export const CompanyEventSchema = SchemaFactory.createForClass(CompanyEvent);
