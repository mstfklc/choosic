import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Company } from './company.schema';

export type UserTransactionDocument = UserTransaction & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class UserTransaction {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  UserId: User;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  CompanyId: Company;
  @Prop({ required: true })
  Price: number;
  @Prop({ default: Date.now })
  CreatedAt: Date;
  @Prop({ default: true })
  IsCompleted: boolean;
}

export const UserTransactionSchema =
  SchemaFactory.createForClass(UserTransaction);
