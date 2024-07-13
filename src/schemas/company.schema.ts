import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MusicCategoryEnum } from '../enum/musicCategory.enum';
import { CompanyConceptEnum } from '../enum/companyConcept.enum';
import { User } from './user.schema';

export type CompanyDocument = Company & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Company {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  UserId: User;
  @Prop({ required: true })
  CompanyName: string;
  @Prop({ required: true })
  Description: string;
  @Prop({ required: true })
  MusicCategory: MusicCategoryEnum[];
  @Prop({ required: true })
  CompanyConcept: CompanyConceptEnum[];
  @Prop({ required: true })
  WorkTime: string;
  @Prop({ required: false })
  CompanyImagePath: [string];
  @Prop({ required: false })
  Latitude: string;
  @Prop({ required: false })
  Longitude: string;
  @Prop({ default: true })
  IsActive: boolean;
  @Prop({ default: false })
  IsApproved: boolean;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
