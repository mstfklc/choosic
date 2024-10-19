import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Company } from '../../schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ListAllCompanyResponseDto } from './response/listAllCompanyResponse.dto';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { throwApiError } from '../../custom/http.utility';
import { CustomExceptionCode } from '../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../enum/apiError.enum';
import { CreateCompanyOwnerRequestDto } from './request/createCompanyOwnerRequest.dto';
import * as bcrypt from 'bcrypt';
import { CompanyOwner } from '../../schemas/companyOwner.schema';
import { CreateCompanyRequestDto } from './request/createCompanyRequest.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { AwsService } from '../../custom/aws/aws.service';
import { CreateCompanyStaffRequestDto } from './request/createCompanyStaffRequest.dto';
import { CompanyStaff } from '../../schemas/companyStaff.schema';
import { UpdateCompanyOwnerRequestDto } from './request/updateCompanyOwnerRequest.dto';
import { UpdateCompanyRequestDto } from './request/updateCompanyRequest.dto';
import { UpdateCompanyStaffRequestDto } from './request/updateCompanyStaffRequest.dto';

@Injectable()
export class BusinessService {
  constructor(
    private readonly awsService: AwsService,
    @InjectModel(Company.name)
    private companyModel: mongoose.Model<Company>,
    @InjectModel(CompanyOwner.name)
    private companyOwnerModel: mongoose.Model<CompanyOwner>,
    @InjectModel(CompanyStaff.name)
    private companyStaffModel: mongoose.Model<CompanyStaff>,
  ) {}

  //SRS-0256
  async listAllCompany(
    auth: AuthRequestDto,
    CompanyName?: string,
  ): Promise<ListAllCompanyResponseDto> {
    try {
      const query: any = { IsDeleted: false };
      if (CompanyName) {
        query.CompanyName = { $regex: CompanyName, $options: 'i' };
      }
      const companies = await this.companyModel
        .find(query)
        .sort({ CreatedAt: -1 });

      const response = companies.map((company) => {
        return {
          id: company._id.toString(),
          companyName: company.CompanyName,
          companyImagePath: company.CompanyImagePath,
          musicCategory: company.MusicCategory,
          createdAt: company.CreatedAt,
        };
      });
      return { items: response };
    } catch (error) {
      throwApiError(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        ApiErrorEnum.api_error_internal_server_error,
      );
    }
  }

  //SRS-0260
  async deleteCompany(
    auth: AuthRequestDto,
    id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const company = await this.companyModel.findOne({ _id: id });
      if (!company) {
        throwApiError(
          CustomExceptionCode.NOT_FOUND,
          ApiErrorEnum.api_error_company_not_found,
        );
      }
      await this.companyModel.updateOne({ _id: id }, { IsDeleted: true });
      return { status: true };
    } catch (error) {
      throwApiError(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        ApiErrorEnum.api_error_internal_server_error,
      );
    }
  }

  //SRS-0270
  async createCompanyOwner(
    auth: AuthRequestDto,
    req: CreateCompanyOwnerRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const existingCompanyOwner = await this.companyOwnerModel.findOne({
        Email: req.Email,
        IsDeleted: false,
      });
      if (existingCompanyOwner) {
        throwApiError(
          CustomExceptionCode.BAD_REQUEST,
          ApiErrorEnum.api_error_company_owner_already_exists,
        );
      }
      const userName = req.Email.split('@')[0];
      const hashedPassword = await bcrypt.hash(req.Password, 10);
      await this.companyOwnerModel.create({
        Username: userName,
        Email: req.Email,
        PasswordHashed: hashedPassword,
      });
      return { status: true };
    } catch (error) {
      throwApiError(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        ApiErrorEnum.api_error_internal_server_error,
      );
    }
  }

  //SRS-0276
  async createCompany(
    auth: AuthRequestDto,
    req: CreateCompanyRequestDto,
    companyImage?: Express.Multer.File,
    companyImage1?: Express.Multer.File,
    companyImage2?: Express.Multer.File,
    companyImage3?: Express.Multer.File,
    companyImage4?: Express.Multer.File,
  ): Promise<SuccessResponseDto> {
    try {
      const companyIsExist = await this.companyModel.findOne({
        $or: [
          { CompanyName: req.Name, IsDeleted: false },
          { Address: req.Address, IsDeleted: false },
        ],
      });
      if (companyIsExist) {
        throwApiError(
          CustomExceptionCode.BAD_REQUEST,
          ApiErrorEnum.api_error_company_already_exist,
        );
      }
      await this.companyModel.create({
        CompanyOwnerId: req.CompanyOwnerId,
        CompanyName: req.Name,
        Description: req.Description,
        MusicCategory: req.MusicCategory,
        CompanyConcept: req.Concept,
        Address: req.Address,
        MondayWorkTime: req.MondayWorkTime,
        TuesdayWorkTime: req.TuesdayWorkTime,
        WednesdayWorkTime: req.WednesdayWorkTime,
        ThursWorkTime: req.ThursdayWorkTime,
        FridayWorkTime: req.FridayWorkTime,
        SaturdayWorkTime: req.SaturdayWorkTime,
        SundayWorkTime: req.SundayWorkTime,
      });
      const companyId = await this.companyModel.findOne({
        CompanyName: req.Name,
      });
      const companyImagePaths = [];

      if (companyImage) {
        const companyImageFileExtension = companyImage.originalname
          .split('.')
          .pop();
        const companyImageFileName = `company/images/${companyId.CompanyOwnerId}/${companyId._id}/${Date.now()}.${companyImageFileExtension}`;
        const frontUploadResult = await this.awsService.uploadSingleFile({
          dataBuffer: companyImage.buffer,
          filename: companyImageFileName,
        });
        companyImagePaths[0] = frontUploadResult.Location;
      }
      if (companyImage1) {
        const companyImage1FileExtension = companyImage1.originalname
          .split('.')
          .pop();
        const companyImage1FileName = `company/images/${companyId.CompanyOwnerId}/${companyId._id}/${Date.now()}.${companyImage1FileExtension}`;
        const backUploadResult = await this.awsService.uploadSingleFile({
          dataBuffer: companyImage1.buffer,
          filename: companyImage1FileName,
        });
        companyImagePaths[1] = backUploadResult.Location;
      }
      if (companyImage2) {
        const companyImage2FileExtension = companyImage2.originalname
          .split('.')
          .pop();
        const companyImage2FileName = `company/images/${companyId.CompanyOwnerId}/${companyId._id}/${Date.now()}.${companyImage2FileExtension}`;
        const rightUploadResult = await this.awsService.uploadSingleFile({
          dataBuffer: companyImage2.buffer,
          filename: companyImage2FileName,
        });
        companyImagePaths[2] = rightUploadResult.Location;
      }
      if (companyImage3) {
        const companyImage3FileExtension = companyImage3.originalname
          .split('.')
          .pop();
        const companyImage3FileName = `company/images/${companyId.CompanyOwnerId}/${companyId._id}/${Date.now()}.${companyImage3FileExtension}`;
        const leftUploadResult = await this.awsService.uploadSingleFile({
          dataBuffer: companyImage3.buffer,
          filename: companyImage3FileName,
        });
        companyImagePaths[3] = leftUploadResult.Location;
      }
      if (companyImage4) {
        const companyImage4FileExtension = companyImage4.originalname
          .split('.')
          .pop();
        const companyImage4FileName = `company/images/${companyId.CompanyOwnerId}/${companyId._id}/${Date.now()}.${companyImage4FileExtension}`;
        const insideUploadResult = await this.awsService.uploadSingleFile({
          dataBuffer: companyImage4.buffer,
          filename: companyImage4FileName,
        });
        companyImagePaths[4] = insideUploadResult.Location;
      }

      await this.companyModel.updateOne(
        { _id: companyId._id },
        {
          CompanyImagePath: [...companyImagePaths],
        },
      );

      return { status: true };
    } catch (error) {
      throwApiError(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        ApiErrorEnum.api_error_internal_server_error,
      );
    }
  }

  //SRS-0284
  async createCompanyStaff(
    auth: AuthRequestDto,
    req: CreateCompanyStaffRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const existingCompanyStaff = await this.companyStaffModel.findOne({
        CompanyId: req.CompanyId,
        Username: req.Username,
        IsDeleted: false,
      });
      if (existingCompanyStaff) {
        throwApiError(
          CustomExceptionCode.BAD_REQUEST,
          ApiErrorEnum.api_error_company_staff_already_exists,
        );
      }
      const hashedPassword = await bcrypt.hash(req.Password, 10);
      await this.companyStaffModel.create({
        CompanyId: req.CompanyId,
        Username: req.Username,
        PasswordHashed: hashedPassword,
      });
      return { status: true };
    } catch (error) {
      throwApiError(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        ApiErrorEnum.api_error_internal_server_error,
      );
    }
  }

  //SRS-0292-0299
  async updateCompanyOwner(
    auth: AuthRequestDto,
    req: UpdateCompanyOwnerRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const existingCompanyOwner = await this.companyOwnerModel.findOne({
        _id: req.Id,
        IsDeleted: false,
      });
      if (!existingCompanyOwner) {
        throwApiError(
          CustomExceptionCode.NOT_FOUND,
          ApiErrorEnum.api_error_company_owner_not_found,
        );
      }
      const updatedData: any = {};
      if (req.Email) {
        const checkExistingEmail = await this.companyOwnerModel.findOne({
          Email: req.Email,
          IsDeleted: false,
        });
        if (checkExistingEmail) {
          throwApiError(
            CustomExceptionCode.BAD_REQUEST,
            ApiErrorEnum.api_error_company_owner_already_exists,
          );
        }
        updatedData.Email = req.Email;
      }
      if (req.Password) {
        updatedData.PasswordHashed = await bcrypt.hash(req.Password, 10);
      }
      if (Object.keys(updatedData).length === 0) {
        throwApiError(
          CustomExceptionCode.BAD_REQUEST,
          ApiErrorEnum.api_error_no_update_fields_provided,
        );
      }
      await this.companyOwnerModel.updateOne({ _id: req.Id }, updatedData);
      return { status: true };
    } catch (error) {
      throwApiError(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        ApiErrorEnum.api_error_internal_server_error,
      );
    }
  }

  //SRS-0292-0299
  async updateCompany(
    auth: AuthRequestDto,
    req: UpdateCompanyRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const existingCompany = await this.companyModel.findOne({
        _id: req.Id,
        IsDeleted: false,
      });
      if (!existingCompany) {
        throwApiError(
          CustomExceptionCode.NOT_FOUND,
          ApiErrorEnum.api_error_company_not_found,
        );
      }

      const fieldsToUpdate = {
        Name: req.Name,
        Description: req.Description,
        MusicCategory: req.MusicCategory,
        CompanyConcept: req.Concept,
        Address: req.Address,
        MondayWorkTime: req.MondayWorkTime,
        TuesdayWorkTime: req.TuesdayWorkTime,
        WednesdayWorkTime: req.WednesdayWorkTime,
        ThursdayWorkTime: req.ThursdayWorkTime,
        FridayWorkTime: req.FridayWorkTime,
        SaturdayWorkTime: req.SaturdayWorkTime,
        SundayWorkTime: req.SundayWorkTime,
      };
      const updatedData = Object.entries(fieldsToUpdate).reduce(
        (acc, [key, value]) => {
          if (value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {},
      );
      if (Object.keys(updatedData).length === 0) {
        throwApiError(
          CustomExceptionCode.BAD_REQUEST,
          ApiErrorEnum.api_error_no_update_fields_provided,
        );
      }
      if (req.Name) {
        const checkExistingName = await this.companyModel.findOne({
          CompanyName: req.Name,
          IsDeleted: false,
        });
        if (checkExistingName) {
          throwApiError(
            CustomExceptionCode.BAD_REQUEST,
            ApiErrorEnum.api_error_company_already_exist,
          );
        }
      }
      if (req.Address) {
        const checkExistingAddress = await this.companyModel.findOne({
          Address: req.Address,
          IsDeleted: false,
        });
        if (checkExistingAddress) {
          throwApiError(
            CustomExceptionCode.BAD_REQUEST,
            ApiErrorEnum.api_error_company_already_exist,
          );
        }
      }
      await this.companyModel.updateOne({ _id: req.Id }, updatedData);
      return { status: true };
    } catch (error) {
      throwApiError(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        ApiErrorEnum.api_error_internal_server_error,
      );
    }
  }

  //SRS-0292-0299
  async updateCompanyStaff(
    auth: AuthRequestDto,
    req: UpdateCompanyStaffRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const existingCompanyStaff = await this.companyStaffModel.findOne({
        _id: req.Id,
        IsDeleted: false,
      });
      if (!existingCompanyStaff) {
        throwApiError(
          CustomExceptionCode.NOT_FOUND,
          ApiErrorEnum.api_error_company_staff_not_found,
        );
      }
      const updatedData: any = {};
      if (req.Username) {
        const checkExistingUsername = await this.companyStaffModel.findOne({
          Username: req.Username,
          CompanyId: existingCompanyStaff.CompanyId,
          IsDeleted: false,
        });
        if (checkExistingUsername) {
          throwApiError(
            CustomExceptionCode.BAD_REQUEST,
            ApiErrorEnum.api_error_company_staff_already_exists,
          );
        }
        updatedData.Username = req.Username;
      }
      if (req.Password) {
        updatedData.PasswordHashed = await bcrypt.hash(req.Password, 10);
      }
      if (Object.keys(updatedData).length === 0) {
        throwApiError(
          CustomExceptionCode.BAD_REQUEST,
          ApiErrorEnum.api_error_no_update_fields_provided,
        );
      }
      await this.companyStaffModel.updateOne({ _id: req.Id }, updatedData);
      return { status: true };
    } catch (error) {
      throwApiError(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        ApiErrorEnum.api_error_internal_server_error,
      );
    }
  }
}
