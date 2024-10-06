import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MusicCategoryEnum } from '../enum/musicCategory.enum';
import { CompanyConceptEnum } from '../enum/companyConcept.enum';

export type CompanyDocument = Company & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Company {
  _id: mongoose.Schema.Types.ObjectId;
  /*@Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyOwner',
    required: true,
  })
  CompanyOwnerId: CompanyOwner;*/
  @Prop({ required: true })
  CompanyName: string;
  @Prop({ required: false })
  Description: string;
  @Prop({ required: false })
  CompanyConcept: CompanyConceptEnum[];
  @Prop({ required: false })
  MusicCategory: MusicCategoryEnum[];
  @Prop({ required: false })
  Address: string;
  @Prop({ required: false })
  CompanyImagePath: [string];
  @Prop({ required: false })
  MondayWorkTime: string;
  @Prop({ required: false })
  TuesdayWorkTime: string;
  @Prop({ required: false })
  WednesdayWorkTime: string;
  @Prop({ required: false })
  ThursWorkTime: string;
  @Prop({ required: false })
  FridayWorkTime: string;
  @Prop({ required: false })
  SaturdayWorkTime: string;
  @Prop({ required: false })
  SundayWorkTime: string;
  @Prop({ required: false })
  Latitude: string;
  @Prop({ required: false })
  Longitude: string;
  @Prop({ default: true })
  IsActive: boolean;
  @Prop({ default: false })
  IsDeleted: boolean;
  @Prop({ default: false })
  IsApproved: boolean;
  @Prop({ default: Date.now })
  CreatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
