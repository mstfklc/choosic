import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDetailDto } from './dto/response/business.detail.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { ListAllCompanyResponseDto } from './dto/response/listAllCompanyResponse.dto';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { CreateCompanyOwnerRequestDto } from './dto/request/createCompanyOwnerRequest.dto';
import { CreateCompanyStaffRequestDto } from './dto/request/createCompanyStaffRequest.dto';
import { UpdateCompanyOwnerRequestDto } from './dto/request/updateCompanyOwnerRequest.dto';
import { UpdateCompanyStaffRequestDto } from './dto/request/updateCompanyStaffRequest.dto';
import { Promise } from 'mongoose';
import { CreateCompanyRequestDto } from './dto/request/createCompanyRequest.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CompanyConceptEnum } from '../../enum/companyConcept.enum';
import { MusicCategoryEnum } from '../../enum/musicCategory.enum';
import { UpdateCompanyRequestDto } from './dto/request/updateCompanyRequest.dto';

@ApiTags('admin')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('/details')
  @ApiOkResponse({ type: BusinessDetailDto })
  async getBusinessDetails(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
  ): Promise<BusinessDetailDto> {
    return this.businessService.getCompanyDetails(auth, req);
  }

  @Get('list-companies')
  @ApiOkResponse({ type: ListAllCompanyResponseDto })
  async listAllCompanies(
    @Req() auth: AuthRequestDto,
    @Query('companyName') companyName?: string,
  ): Promise<ListAllCompanyResponseDto> {
    return this.businessService.listAllCompany(auth, companyName);
  }

  @Delete('company')
  @ApiOkResponse({ type: SuccessResponseDto })
  async deleteCompany(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.businessService.deleteCompany(auth, req);
  }

  @Post('company-owner')
  @ApiOkResponse({ type: SuccessResponseDto })
  async createCompanyOwner(
    @Req() auth: AuthRequestDto,
    @Body() req: CreateCompanyOwnerRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.businessService.createCompanyOwner(auth, req);
  }

  @Post('company')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        CompanyOwnerId: { type: 'string' },
        Name: { type: 'string' },
        Description: { type: 'string' },
        Concept: {
          type: 'array',
          items: {
            type: 'string',
            enum: Object.values(CompanyConceptEnum),
          },
        },
        MusicCategory: {
          type: 'array',
          items: {
            type: 'string',
            enum: Object.values(MusicCategoryEnum),
          },
        },
        Address: { type: 'string' },
        MondayWorkTime: { type: 'string' },
        TuesdayWorkTime: { type: 'string' },
        WednesdayWorkTime: { type: 'string' },
        ThursdayWorkTime: { type: 'string' },
        FridayWorkTime: { type: 'string' },
        SaturdayWorkTime: { type: 'string' },
        SundayWorkTime: { type: 'string' },
        companyImage: {
          type: 'string',
          format: 'binary',
        },
        companyImage1: {
          type: 'string',
          format: 'binary',
        },
        companyImage2: {
          type: 'string',
          format: 'binary',
        },
        companyImage3: {
          type: 'string',
          format: 'binary',
        },
        companyImage4: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'companyImage', maxCount: 1 },
      { name: 'companyImage1', maxCount: 1 },
      { name: 'companyImage2', maxCount: 1 },
      { name: 'companyImage3', maxCount: 1 },
      { name: 'companyImage4', maxCount: 1 },
    ]),
  )
  @ApiOkResponse({ type: SuccessResponseDto })
  async createCompany(
    @Req() auth: AuthRequestDto,
    @Body() req: CreateCompanyRequestDto,
    @UploadedFiles()
    files: {
      companyImage?: Express.Multer.File[];
      companyImage1?: Express.Multer.File[];
      companyImage2?: Express.Multer.File[];
      companyImage3?: Express.Multer.File[];
      companyImage4?: Express.Multer.File[];
    },
  ): Promise<SuccessResponseDto> {
    const companyImageFile = files.companyImage?.[0];
    const companyImage1File = files.companyImage1?.[0];
    const companyImage2File = files.companyImage2?.[0];
    const companyImage3File = files.companyImage3?.[0];
    const companyImage4File = files.companyImage4?.[0];
    return this.businessService.createCompany(
      auth,
      req,
      companyImageFile,
      companyImage1File,
      companyImage2File,
      companyImage3File,
      companyImage4File,
    );
  }

  @Post('company-staff')
  @ApiOkResponse({ type: SuccessResponseDto })
  async createCompanyStaff(
    @Req() auth: AuthRequestDto,
    @Body() req: CreateCompanyStaffRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.businessService.createCompanyStaff(auth, req);
  }

  @Put('company-owner')
  @ApiOkResponse({ type: SuccessResponseDto })
  async updateCompanyOwner(
    @Req() auth: AuthRequestDto,
    @Body() req: UpdateCompanyOwnerRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.businessService.updateCompanyOwner(auth, req);
  }

  @Put('company')
  @ApiOkResponse({ type: SuccessResponseDto })
  async updateCompany(
    @Req() auth: AuthRequestDto,
    @Body() req: UpdateCompanyRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.businessService.updateCompany(auth, req);
  }

  @Put('company-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        companyImage: {
          type: 'string',
          format: 'binary',
        },
        companyImage1: {
          type: 'string',
          format: 'binary',
        },
        companyImage2: {
          type: 'string',
          format: 'binary',
        },
        companyImage3: {
          type: 'string',
          format: 'binary',
        },
        companyImage4: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'companyImageFile', maxCount: 1 },
      { name: 'companyImage1File', maxCount: 1 },
      { name: 'companyImage2File', maxCount: 1 },
      { name: 'companyImage3File', maxCount: 1 },
      { name: 'companyImage4File', maxCount: 1 },
    ]),
  )
  @ApiOkResponse({ type: SuccessResponseDto })
  async updateVehicleDetailImages(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
    @UploadedFiles()
    files: {
      companyImageFile?: Express.Multer.File[];
      companyImage1File?: Express.Multer.File[];
      companyImage2File?: Express.Multer.File[];
      companyImage3File?: Express.Multer.File[];
      companyImage4File?: Express.Multer.File[];
    },
  ): Promise<SuccessResponseDto> {
    const companyImageFile = files.companyImageFile?.[0];
    const companyImage1File = files.companyImage1File?.[0];
    const companyImage2File = files.companyImage2File?.[0];
    const companyImage3File = files.companyImage3File?.[0];
    const companyImage4File = files.companyImage4File?.[0];
    return this.businessService.updateCompanyImage(
      auth,
      req,
      companyImageFile,
      companyImage1File,
      companyImage2File,
      companyImage3File,
      companyImage4File,
    );
  }

  @Put('company-staff')
  @ApiOkResponse({ type: SuccessResponseDto })
  async updateCompanyStaff(
    @Req() auth: AuthRequestDto,
    @Body() req: UpdateCompanyStaffRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.businessService.updateCompanyStaff(auth, req);
  }
}
