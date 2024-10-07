import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: true,
})
export class FeedbackApplication {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ types: Types.ObjectId, ref: 'User', required: false })
  senderId?: Types.ObjectId | null;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  currentApplicationVersion: string;
}

export const FeedbackApplicationSchema =
  SchemaFactory.createForClass(FeedbackApplication);
