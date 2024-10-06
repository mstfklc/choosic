import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enum/role.enum';

export type AdminDocument = Admin & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Admin {
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
    default: Role.Admin,
  })
  Roles: Role;
  @Prop({ default: new Date() })
  CreatedDate: Date;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
