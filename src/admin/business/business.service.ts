import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../../schemas/company.schema';
import { Model } from 'mongoose';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { BusinessDetailDto } from './dto/business.detail.dto';
import { throwApiError } from '../../custom/http.utility';
import { CustomExceptionCode } from '../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../enum/apiError.enum';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
  ) {}

  async getCompanyDetails(
    idRequestDto: IdRequestDto,
  ): Promise<BusinessDetailDto> {
    const { id } = idRequestDto;

    const company = await this.companyModel
      .findOne({ _id: id, isDeleted: false })
      .exec();

    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_found,
      );
    }

    return {
      CompanyName: company.CompanyName,
      CompanyImagePath: company.CompanyImagePath,
      CreatedDate: company.CreatedAt,
    };
  }

  async deleteCompany(idRequestDto: IdRequestDto): Promise<any> {
    const { id } = idRequestDto;

    const company = await this.companyModel
      .findOne({ _id: id, isDeleted: false })
      .exec();

    if (!company) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_company_not_found,
      );
    }

    return this.companyModel.updateOne(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true } },
    );
  }
}
