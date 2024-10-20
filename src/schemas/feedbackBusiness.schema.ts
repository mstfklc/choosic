import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Company } from './company.schema';
import { User } from './user.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class FeedbackBusiness {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  })
  UserId?: User;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  CompanyId: Company;
  @Prop({ required: true })
  Title: string;
  @Prop({ required: true })
  Message: string;
  @Prop({ default: false })
  IsCompanyVerified: boolean;
  @Prop({ default: Date.now })
  CreatedAt: Date;
}

export const FeedbackBusinessSchema =
  SchemaFactory.createForClass(FeedbackBusiness);
