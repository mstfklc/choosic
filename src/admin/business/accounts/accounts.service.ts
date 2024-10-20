import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyOwner } from '../../../schemas/companyOwner.schema';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { CompanyOwnerInfoDto } from '../dto/camponyowner.info.dto';
import { Company } from '../../../schemas/company.schema';
import { throwApiError } from '../../../custom/http.utility';
import { CustomExceptionCode } from '../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../enum/apiError.enum';
import { CompanyStaffInfoDto } from '../dto/companystaff.info.dto';
import { CompanyStaff } from '../../../schemas/companyStaff.schema';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(CompanyOwner.name)
    private readonly companyOwnerModel: Model<CompanyOwner>,
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    @InjectModel(CompanyStaff.name)
    private readonly companyStaffModel: Model<CompanyStaff>,
  ) {}

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
