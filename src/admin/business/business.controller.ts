import { Body, Controller, Delete, Get, Query, Req } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDetailDto } from './dto/business.detail.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { ListAllCompanyResponseDto } from './response/listAllCompanyResponse.dto';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';

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
}
