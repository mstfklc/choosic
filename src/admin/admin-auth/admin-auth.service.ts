import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Admin } from '../../schemas/admin.schema';
import { AdminLoginRequest } from './request/adminLoginRequest';
import { AdminLoginResponse } from './response/adminLoginResponse';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: mongoose.Model<Admin>,
  ) {}

  async login(req: AdminLoginRequest): Promise<AdminLoginResponse> {
    const admin = await this.adminModel.findOne({
      Email: req.email,
      Password: req.password,
    });
    if (!admin) {
      throw new Error('Admin not found');
    }
    return {
      email: admin.Email,
      name: admin.Name,
      surname: admin.Surname,
    };
  }
}
