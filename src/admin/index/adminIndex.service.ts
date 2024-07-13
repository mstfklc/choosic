import { Injectable } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { AddAdminRequest } from './dto/req/addAdminRequest';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { throwApiError } from '../../util/http.utility';
import { CustomExceptionCode } from '../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../enum/apiError.enum';
import * as bcrypt from 'bcrypt';
import { Role } from '../../enum/role.enum';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { AdminListResponseItem } from './dto/res/listAdminResponse';
import { AdminDetailResponse } from './dto/res/adminDetailResponse';
import { UpdateAdminRequest } from './dto/req/updateAdmınRequest';

@Injectable()
export class AdminIndexService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async addAdmin(
    auth: AuthRequestDto,
    req: AddAdminRequest,
  ): Promise<SuccessResponseDto> {
    const userCheck = await this.userModel.findOne({
      Email: req.email,
      IsDeleted: false,
    });
    if (userCheck) {
      throwApiError(
        CustomExceptionCode.CONFLICT,
        ApiErrorEnum.api_error_user_already_exist,
      );
    }
    const userNameCheck = await this.userModel.findOne({
      UserName: req.userName,
      IsDeleted: false,
    });
    if (userNameCheck) {
      throwApiError(
        CustomExceptionCode.CONFLICT,
        ApiErrorEnum.api_error_user_already_exist,
      );
    }
    const hashedPassword = await bcrypt.hash(req.password, 10);
    await this.userModel.create({
      UserName: req.userName,
      Name: req.name,
      Surname: req.surname,
      Email: req.email,
      Phone: req.phone,
      PasswordHashed: hashedPassword,
      AgreementAcceptance: true,
      Roles: [Role.Admin],
    });
    return Promise.resolve({ status: true });
  }

  async deleteAdmin(
    auth: AuthRequestDto,
    req: IdRequestDto,
  ): Promise<SuccessResponseDto> {
    await this.userModel.updateOne(
      {
        _id: req.id,
        Roles: [Role.Admin],
      },
      {
        IsDeleted: true,
      },
    );
    return Promise.resolve({ status: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async listAdmins(auth: AuthRequestDto): Promise<AdminListResponseItem> {
    const admins = await this.userModel.find({
      IsDeleted: false,
      Roles: [Role.Admin],
    });
    const response: AdminListResponseItem = {
      items: admins.map((admin) => ({
        userId: admin._id.toString(),
        userName: admin.UserName,
        name: admin.Name,
        surname: admin.Surname,
        email: admin.Email,
        phone: admin.Phone,
        isActive: admin.IsActive,
      })),
    };
    return Promise.resolve(response);
  }

  async adminDetail(
    auth: AuthRequestDto,
    id: string,
  ): Promise<AdminDetailResponse> {
    const admin = await this.userModel.findOne({
      _id: id,
      IsDeleted: false,
      IsActive: true,
      Roles: [Role.Admin],
    });
    if (!admin) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    const response: AdminDetailResponse = {
      id: admin._id.toString(),
      userName: admin.UserName,
      name: admin.Name,
      surname: admin.Surname,
      email: admin.Email,
      phone: admin.Phone,
    };
    return Promise.resolve(response);
  }

  async updateAdmin(
    auth: AuthRequestDto,
    req: UpdateAdminRequest,
  ): Promise<SuccessResponseDto> {
    const admin = await this.userModel.findOne({
      _id: req.id,
      IsDeleted: false,
      IsActive: true,
      Roles: [Role.Admin],
    });
    if (!admin) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    const emailCheck = await this.userModel.findOne({
      Email: req.email,
      IsDeleted: false,
      _id: { $ne: req.id },
    });
    if (emailCheck) {
      throwApiError(
        CustomExceptionCode.CONFLICT,
        ApiErrorEnum.api_error_user_already_exist,
      );
    }
    const userNameCheck = await this.userModel.findOne({
      UserName: req.userName,
      IsDeleted: false,
      _id: { $ne: req.id },
    });
    if (userNameCheck) {
      throwApiError(
        CustomExceptionCode.CONFLICT,
        ApiErrorEnum.api_error_user_already_exist,
      );
    }
    await this.userModel.updateOne(
      { _id: req.id, Roles: [Role.Admin] },
      {
        UserName: req.userName ?? admin.UserName,
        Name: req.name ?? admin.Name,
        Surname: req.surname ?? admin.Surname,
        Email: req.email ?? admin.Email,
        Phone: req.phone ?? admin.Phone,
        IsActive: req.id ?? admin.IsActive,
      },
    );
    return Promise.resolve({ status: true });
  }
}
