import mongoose, { Document } from 'mongoose';
import { Role } from '../enum/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  Username: string;
  @Prop({ required: true })
  Name: string;
  @Prop({ required: true })
  Surname: string;
  @Prop({ required: true })
  Phone: string;
  @Prop({ required: true })
  Email: string;
  @Prop({ required: true })
  PasswordHashed: string;
  @Prop({
    required: true,
    default: Role.User,
  })
  Roles: Role;
  @Prop({ default: Date.now })
  CreatedAt: Date;
  @Prop({ required: true })
  AgreementAcceptance: boolean;
  @Prop({ default: false })
  IsPhoneConfirmed: boolean;
  @Prop({ default: false })
  IsMailConfirmed: boolean;
  @Prop({ default: true })
  IsActive: boolean;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
