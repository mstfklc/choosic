import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Admin } from '../../schemas/admin.schema';
import { AdminLoginRequest } from './request/adminLoginRequest';
import { LoginResponseDto } from '../../globalDto/loginResponseDto';
import { throwApiError } from '../../custom/http.utility';
import { CustomExceptionCode } from '../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../enum/apiError.enum';
import * as bcrypt from 'bcrypt';
import { Role } from '../../enum/role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: mongoose.Model<Admin>,
    private jwtService: JwtService,
  ) {}

  async login(req: AdminLoginRequest): Promise<LoginResponseDto> {
    const admin = await this.adminModel.findOne({
      Email: req.email,
      Roles: Role.Admin,
      IsDeleted: false,
    });
    if (!admin) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    const isPasswordMatch = await bcrypt.compare(
      req.password,
      admin.PasswordHashed,
    );
    if (!isPasswordMatch) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_password_not_match,
      );
    }
    const jwtToken = this.jwtService.sign({
      id: admin._id,
    });
    return {
      accessToken: jwtToken,
    };
  }
}
