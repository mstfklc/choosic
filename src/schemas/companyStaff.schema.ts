import mongoose, { Document } from 'mongoose';
import { Role } from '../enum/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from './company.schema';

export type CompanyStaffDocument = CompanyStaff & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class CompanyStaff {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  CompanyId: Company;
  @Prop({ required: true })
  Username: string;
  @Prop({ required: true })
  PasswordHashed: string;
  @Prop({
    required: true,
    default: Role.CompanyStaff,
  })
  Roles: Role;
  @Prop({ default: Date.now })
  CreatedAt: Date;
  @Prop({ default: true })
  IsActive: boolean;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const CompanyStaffSchema = SchemaFactory.createForClass(CompanyStaff);
