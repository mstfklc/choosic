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
  @Prop({ required: false })
  Description: string;
  @Prop({ required: false })
  Address: string;
  @Prop({ required: false })
  MusicCategory: MusicCategoryEnum[];
  @Prop({ required: false })
  CompanyConcept: CompanyConceptEnum[];
  @Prop({ required: false })
  MidWeekWorkTime: string;
  @Prop({ required: false })
  SaturdayWorkTime: string;
  @Prop({ required: false })
  SundayWorkTime: string;
  @Prop({ required: false })
  CompanyImagePath: [string];
  @Prop({ required: false })
  SpotifyToken: string;
  @Prop({ required: false })
  SpotifyEmail: string;
  @Prop({ required: false })
  SpotifyPassword: string;
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
  @Prop({ default: Date.now })
  CreatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
