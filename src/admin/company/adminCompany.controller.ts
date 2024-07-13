import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../custom/jwt/guard/jwt.guard';
import { RolesGuard } from '../../custom/rbac/rbacGuard';
import { Roles } from '../../custom/rbac/role.decorator';
import { Role } from '../../enum/role.enum';
import { AdminCompanyService } from './adminCompany.service';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { CompanyListResponseDto } from './dto/res/companyListResponseDto';
import { CompanyDetailResponseDto } from './dto/res/companyDetail.response.dto';
import { UpdateCompanyRequestDto } from './dto/req/updateCompany.request.dto';
import { ShowCompanyPasswordResponseDto } from './dto/res/showCompanyPassword.response.dto';

@Controller('admin/company')
@ApiTags('Admin')
@ApiSecurity('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminCompanyController {
  constructor(private readonly adminCompanyService: AdminCompanyService) {}

  @Get()
  async listAllCompanies(
    @Req() auth: AuthRequestDto,
  ): Promise<CompanyListResponseDto> {
    return await this.adminCompanyService.listAllCompanies(auth);
  }

  @Get('/:id')
  async companyDetail(
    @Req() auth: AuthRequestDto,
    @Param('id') id: string,
  ): Promise<CompanyDetailResponseDto> {
    return await this.adminCompanyService.companyDetail(auth, id);
  }

  @Get('/password')
  async showCompanyPassword(
    @Req() auth: AuthRequestDto,
    @Param('id') id: string,
  ): Promise<ShowCompanyPasswordResponseDto> {
    return this.adminCompanyService.showCompanyPassword(auth, id);
  }

  @Delete()
  async deleteCompany(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.adminCompanyService.deleteCompany(auth, req);
  }

  @Put()
  async updateCompany(
    @Req() auth: AuthRequestDto,
    @Body() req: UpdateCompanyRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.adminCompanyService.updateCompany(auth, req);
  }
}
