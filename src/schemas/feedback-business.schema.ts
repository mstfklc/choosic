import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: true,
})
export class FeedbackBusiness {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ types: Types.ObjectId, ref: 'User', required: false })
  senderId?: Types.ObjectId | null;

  @Prop({ required: true })
  businessId: string;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: true })
  message: string;
}

export const FeedBackBusinessSchema =
  SchemaFactory.createForClass(FeedbackBusiness);
