import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../../../schemas/company.schema';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { BusinessInfoDto } from '../dto/business.info.dto';
import { UpdateBusinessInfoDto } from '../dto/update.business.info.dto';
import { throwApiError } from '../../../custom/http.utility';
import { CustomExceptionCode } from '../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../enum/apiError.enum';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel('Company.name') private companyModel: Model<Company>,
  ) {}

  async getCompanyInfo(idRequestDto: IdRequestDto): Promise<BusinessInfoDto> {
    const company = await this.companyModel
      .findById({ id: idRequestDto.id })
      .exec();

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
    idRequestDto: IdRequestDto,
    updateBusinessInfoDto: UpdateBusinessInfoDto,
  ): Promise<Company> {
    const company = await this.companyModel.findById(idRequestDto.id).exec();

    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_found,
      );
    }
    const updatedCompany = await this.companyModel
      .findByIdAndUpdate(idRequestDto.id, updateBusinessInfoDto)
      .exec();

    if (!updatedCompany) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_updated,
      );
    }
    return updatedCompany;
  }
}
