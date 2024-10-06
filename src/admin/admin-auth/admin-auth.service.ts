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
import { AdminRegisterRequestDto } from './request/adminregisterRequest.dto';

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

  async create(
    adminRequest: AdminRegisterRequestDto,
  ): Promise<LoginResponseDto> {
    const existingAdmin = await this.adminModel.findOne({
      $or: [{ Username: adminRequest.Username }, { Email: adminRequest.Email }],
    });

    if (existingAdmin) {
      if (existingAdmin.Username === adminRequest.Username) {
        throwApiError(
          CustomExceptionCode.CONFLICT,
          ApiErrorEnum.api_error_username_already_exist,
        );
      } else if (existingAdmin.Email === adminRequest.Email) {
        throwApiError(
          CustomExceptionCode.CONFLICT,
          ApiErrorEnum.api_error_email_already_exist,
        );
      }
    }

    const hashedPassword = await bcrypt.hash(adminRequest.Password, 10);

    const createdAdmin = await this.adminModel.create({
      ...adminRequest,
      password: hashedPassword,
    });
    const jwtToken = this.jwtService.sign({
      id: createdAdmin._id,
    });
    return {
      accessToken: jwtToken,
    };
  }
}
