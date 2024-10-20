import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../../../schemas/company.schema';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { BusinessInfoDto } from './dto/response/business.info.dto';
import { UpdateBusinessInfoDto } from './dto/response/update.business.info.dto';
import { throwApiError } from '../../../custom/http.utility';
import { CustomExceptionCode } from '../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../enum/apiError.enum';
import { CompanyOwnerInfoDto } from './dto/response/camponyowner.info.dto';
import { CompanyStaffInfoDto } from './dto/response/companystaff.info.dto';
import { CompanyOwner } from '../../../schemas/companyOwner.schema';
import { CompanyStaff } from '../../../schemas/companyStaff.schema';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(CompanyOwner.name)
    private readonly companyOwnerModel: Model<CompanyOwner>,
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    @InjectModel(CompanyStaff.name)
    private readonly companyStaffModel: Model<CompanyStaff>,
  ) {}

  async getCompanyInfo(req: IdRequestDto): Promise<BusinessInfoDto> {
    const company = await this.companyModel.findById({ id: req.id }).exec();

    return {
      Description: company.Description,
      CompanyImagePath: company.CompanyImagePath,
      Address: company.Address,
      CompanyConcept: company.CompanyConcept,
      MusicCategory: company.MusicCategory,
      MondayWorkTime: company.MondayWorkTime,
      TuesdayWorkTime: company.TuesdayWorkTime,
      WednesdayWorkTime: company.WednesdayWorkTime,
      ThursWorkTime: company.ThursWorkTime,
      FridayWorkTime: company.FridayWorkTime,
      SaturdayWorkTime: company.SaturdayWorkTime,
      SundayWorkTime: company.SundayWorkTime,
    };
  }

  async updateBusinessInfo(
    req: IdRequestDto,
    updateBusinessInfoDto: UpdateBusinessInfoDto,
  ): Promise<Company> {
    const company = await this.companyModel.findById(req.id).exec();

    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_found,
      );
    }
    const updatedCompany = await this.companyModel
      .findByIdAndUpdate(req.id, updateBusinessInfoDto)
      .exec();

    if (!updatedCompany) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_updated,
      );
    }
    return updatedCompany;
  }

  async getCompanyOwnerInfo(req: IdRequestDto): Promise<CompanyOwnerInfoDto> {
    const company = await this.companyModel
      .findById(req.id)
      .populate('CompanyOwnerId')
      .exec();

    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_companyOwner_not_found,
      );
    }

    return {
      id: company.CompanyOwnerId._id.toString(),
      Email: company.CompanyOwnerId.Email,
      Password: company.CompanyOwnerId.PasswordHashed,
    };
  }

  async getCompanyStaffInfo(req: IdRequestDto): Promise<CompanyStaffInfoDto> {
    const companyStaffs = await this.companyStaffModel
      .find({ CompanyId: req.id })
      .exec();
    if (!companyStaffs) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_companyStaff_not_found,
      );
    }
    const mapStaff = companyStaffs.map((staff) => ({
      id: staff.id.toString(),
      Username: staff.Username,
      PasswordHashed: staff.PasswordHashed,
    }));
    return { items: mapStaff };
  }
}
