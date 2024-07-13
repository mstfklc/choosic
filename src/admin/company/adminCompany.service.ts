import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Company } from '../../schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { CompanyListResponseDto } from './dto/res/companyListResponseDto';
import { CompanyDetailResponseDto } from './dto/res/companyDetail.response.dto';
import { throwApiError } from '../../util/http.utility';
import { CustomExceptionCode } from '../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../enum/apiError.enum';
import { UpdateCompanyRequestDto } from './dto/req/updateCompany.request.dto';
import { ShowCompanyPasswordResponseDto } from './dto/res/showCompanyPassword.response.dto';

@Injectable()
export class AdminCompanyService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Company.name)
    private companyModel: mongoose.Model<Company>,
  ) {}

  async listAllCompanies(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    auth: AuthRequestDto,
  ): Promise<CompanyListResponseDto> {
    const companies = await this.companyModel
      .find({
        IsDeleted: false,
      })
      .populate('UserId');
    const response: CompanyListResponseDto = {
      items: companies.map((company) => ({
        CompanyId: company._id.toString(),
        CompanyOwnerId: company.UserId.toString(),
        CompanyOwnerFullName:
          company.UserId.Name + ' ' + company.UserId.Surname,
        CompanyName: company.CompanyName,
        SpotifyEmail: company.SpotifyEmail,
        Address: company.Address,
        MusicCategory: company.MusicCategory.map((category) => category),
        Concept: company.CompanyConcept.map((concept) => concept),
        IsActive: company.IsActive,
        IsApproved: company.IsApproved,
        CreatedAt: company.CreatedAt,
      })),
    };
    return Promise.resolve(response);
  }

  async companyDetail(
    auth: AuthRequestDto,
    id: string,
  ): Promise<CompanyDetailResponseDto> {
    const company = await this.companyModel.findOne({
      _id: id,
      IsDeleted: false,
    });
    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_found,
      );
    }
    const response: CompanyDetailResponseDto = {
      CompanyId: company._id.toString(),
      CompanyName: company.CompanyName,
      CompanyOwnerFullName: company.UserId.Name + ' ' + company.UserId.Surname,
      CompanyOwnerId: company.UserId.toString(),
      Description: company.Description,
      MusicCategory: company.MusicCategory.map((category) => category),
      Concept: company.CompanyConcept.map((concept) => concept),
      SpotifyEmail: company.SpotifyEmail,
      MidWeekWorkTime: company.MidWeekWorkTime,
      SaturdayWorkTime: company.SaturdayWorkTime,
      SundayWorkTime: company.SundayWorkTime,
      Latitude: company.Latitude,
      Longitude: company.Longitude,
      IsActive: company.IsActive,
      IsApproved: company.IsApproved,
      CreatedAt: company.CreatedAt,
    };
    return Promise.resolve(response);
  }

  async showCompanyPassword(
    auth: AuthRequestDto,
    id: string,
  ): Promise<ShowCompanyPasswordResponseDto> {
    const company = await this.companyModel.findOne({
      _id: id,
      IsDeleted: false,
    });
    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_found,
      );
    }
    const response: ShowCompanyPasswordResponseDto = {
      password: company.SpotifyPassword,
    };
    return Promise.resolve(response);
  }

  async deleteCompany(
    auth: AuthRequestDto,
    req: IdRequestDto,
  ): Promise<SuccessResponseDto> {
    const company = await this.companyModel.findOne({
      _id: req.id,
      UserId: auth.user.id,
      IsDeleted: false,
    });
    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_found,
      );
    }
    await this.companyModel.updateOne(
      {
        _id: req.id,
      },
      { IsDeleted: true },
    );
    return Promise.resolve({ status: true });
  }

  async updateCompany(
    auth: AuthRequestDto,
    req: UpdateCompanyRequestDto,
  ): Promise<SuccessResponseDto> {
    const company = await this.companyModel.findOne({
      _id: req.companyId,
      UserId: auth.user.id,
      IsDeleted: false,
    });
    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_found,
      );
    }
    await this.companyModel.updateOne(
      { _id: req.companyId },
      {
        CompanyName: req.companyName ?? company.CompanyName,
        Description: req.description ?? company.Description,
        MusicCategory: req.musicCategory ?? company.MusicCategory,
        SpotifyEmail: req.spotifyEmail ?? company.SpotifyEmail,
        SpotifyPassword: req.spotifyPassword ?? company.SpotifyPassword,
        Concept: req.companyConcept ?? company.CompanyConcept,
        MidWeekWorkTime: req.midWeekWorkTime ?? company.MidWeekWorkTime,
        SaturdayWorkTime: req.saturdayWorkTime ?? company.SaturdayWorkTime,
        SundayWorkTime: req.sundayWorkTime ?? company.SundayWorkTime,
        Latitude: req.latitude ?? company.Latitude,
        Longitude: req.longitude ?? company.Longitude,
        IsActive: req.isActive ?? company.IsActive,
        IsApproved: req.isApproved ?? company.IsApproved,
      },
    );
    return Promise.resolve({ status: true });
  }
}
