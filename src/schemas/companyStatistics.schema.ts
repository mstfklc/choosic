import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from './company.schema';

export type CompanyStatisticsDocument = CompanyStatistics & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class CompanyStatistics {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  CompanyId: Company;
  @Prop({ required: true })
  PlaylistId: string;
  @Prop({ required: false })
  MusicName: string;
  @Prop({ required: false })
  Artist: string;
  @Prop({ required: true })
  Price: Date;
  @Prop({ default: Date.now })
  CreatedAt: Date;
}

export const CompanyStatisticsSchema =
  SchemaFactory.createForClass(CompanyStatistics);
