import mongoose, { Document } from 'mongoose';
import { Role } from '../enum/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CompanyOwnerDocument = CompanyOwner & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class CompanyOwner {
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
  @Prop({ default: false })
  IsMailVerified: boolean;
  @Prop({ required: true })
  PasswordHashed: string;
  @Prop({
    required: true,
    default: Role.CompanyOwner,
  })
  Roles: Role;
  @Prop({ default: Date.now })
  CreatedAt: Date;
  @Prop({ default: true })
  IsActive: boolean;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const CompanyOwnerSchema = SchemaFactory.createForClass(CompanyOwner);
