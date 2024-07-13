import { Injectable } from '@nestjs/common';
import mongoose, { Promise } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { AddCompanyOwnerRequestDto } from './dto/req/addCompanyOwner.request.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { throwApiError } from '../../util/http.utility';
import { CustomExceptionCode } from '../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../enum/apiError.enum';
import { Role } from '../../enum/role.enum';
import * as bcrypt from 'bcrypt';
import { CompanyOwnerListResponseDto } from './dto/res/companyOwnerList.response.dto';
import { CompanyOwnerDetailListResponseDto } from './dto/res/companyOwnerDetailList.response.dto';
import { UpdateCompanyOwnerRequestDto } from './dto/req/updateCompanyOwner.request.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';

@Injectable()
export class AdminCompanyOwnerService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async addCompanyOwner(
    auth: AuthRequestDto,
    req: AddCompanyOwnerRequestDto,
  ): Promise<SuccessResponseDto> {
    const user = await this.userModel.findOne({
      UserName: req.username,
      IsDeleted: false,
    });
    if (user) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_user_already_exist,
      );
    }
    const userEmail = await this.userModel.findOne({
      Email: req.email,
      IsDeleted: false,
    });
    if (userEmail) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_email_already_exist,
      );
    }
    const hashedPassword = await bcrypt.hash(req.password, 10);
    await this.userModel.create({
      UserName: req.username,
      Name: req.name,
      Surname: req.surname,
      Phone: req.phone,
      Email: req.email,
      Roles: [Role.CompanyOwner],
      PasswordHashed: hashedPassword,
      AgreementAcceptance: true,
    });
    return Promise.resolve({ status: true });
  }

  async listCompanyOwners(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    auth: AuthRequestDto,
  ): Promise<CompanyOwnerListResponseDto> {
    const companyOwners = await this.userModel.find({
      Roles: Role.CompanyOwner,
      IsDeleted: false,
    });
    const response: CompanyOwnerListResponseDto = {
      items: companyOwners.map((item) => ({
        id: item._id.toString(),
        userName: item.Name,
        name: item.Surname,
        surname: item.Phone,
        email: item.Email,
        phone: item.UserName,
        createdAt: item.CreatedDate,
      })),
    };
    return Promise.resolve(response);
  }

  async companyOwnerDetail(
    auth: AuthRequestDto,
    id: string,
  ): Promise<CompanyOwnerDetailListResponseDto> {
    const companyOwner = await this.userModel.findOne({
      _id: id,
      Roles: Role.CompanyOwner,
      IsDeleted: false,
    });
    if (!companyOwner) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    const response: CompanyOwnerDetailListResponseDto = {
      id: companyOwner._id.toString(),
      userName: companyOwner.Name,
      name: companyOwner.Surname,
      surname: companyOwner.Phone,
      email: companyOwner.Email,
      phone: companyOwner.UserName,
      createdAt: companyOwner.CreatedDate,
    };
    return Promise.resolve(response);
  }

  async updateCompanyOwner(
    auth: AuthRequestDto,
    req: UpdateCompanyOwnerRequestDto,
  ): Promise<SuccessResponseDto> {
    const companyOwner = await this.userModel.findOne({
      _id: req.id,
      Roles: Role.CompanyOwner,
      IsDeleted: false,
    });
    if (!companyOwner) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    await this.userModel.updateOne(
      { _id: req.id },
      {
        UserName: req.username,
        Email: req.email,
        Name: req.name,
        Surname: req.surname,
        Phone: req.phone,
      },
    );
    return Promise.resolve({ status: true });
  }

  async deleteCompanyOwner(
    auth: AuthRequestDto,
    req: IdRequestDto,
  ): Promise<SuccessResponseDto> {
    const companyOwner = await this.userModel.findOne({
      _id: req.id,
      Roles: Role.CompanyOwner,
      IsDeleted: false,
    });
    if (!companyOwner) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    await this.userModel.updateOne({ _id: req.id }, { IsDeleted: true });
    return Promise.resolve({ status: true });
  }
}
