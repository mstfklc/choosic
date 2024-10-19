import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { Admin } from './admin.schema';

@Schema({
  timestamps: true,
  versionKey: true,
})
export class FeedbackApplication {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  })
  UserId?: User;
  @Prop({ required: true })
  Title: string;
  @Prop({ required: true })
  Message: string;
  @Prop({ required: true })
  CurrentApplicationVersion: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: false,
  })
  VerifiedAdminId: Admin;
  @Prop({ default: false })
  IsAdminVerified: boolean;
  @Prop({ required: false })
  AdminSawDate: Date;
  @Prop({ default: Date.now })
  CreatedAt: Date;
}

export const FeedbackApplicationSchema =
  SchemaFactory.createForClass(FeedbackApplication);
