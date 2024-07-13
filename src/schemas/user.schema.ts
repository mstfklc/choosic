import { Document } from 'mongoose';
import { Role } from '../enum/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  UserName: string;
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
  })
  Roles: Role[];
  @Prop({ required: true })
  AgreementAcceptance: boolean;
  @Prop({ default: true })
  IsActive: boolean;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
