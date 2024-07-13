import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../../enum/role.enum';
import { Roles } from '../../custom/rbac/role.decorator';
import { RolesGuard } from '../../custom/rbac/rbacGuard';
import { JwtAuthGuard } from '../../custom/jwt/guard/jwt.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminCompanyOwnerService } from './adminCompanyOwner.service';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { AddCompanyOwnerRequestDto } from './dto/req/addCompanyOwner.request.dto';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { CompanyOwnerListResponseDto } from './dto/res/companyOwnerList.response.dto';
import { CompanyOwnerDetailListResponseDto } from './dto/res/companyOwnerDetailList.response.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { UpdateCompanyOwnerRequestDto } from './dto/req/updateCompanyOwner.request.dto';

@Controller('admin/companyOwner')
@ApiTags('Admin')
@ApiSecurity('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminCompanyOwnerController {
  constructor(private adminCompanyOwnerService: AdminCompanyOwnerService) {}

  @Post()
  addCompanyOwner(
    @Req() auth: AuthRequestDto,
    @Body() req: AddCompanyOwnerRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.adminCompanyOwnerService.addCompanyOwner(auth, req);
  }

  @Get()
  listCompanyOwners(
    @Req() auth: AuthRequestDto,
  ): Promise<CompanyOwnerListResponseDto> {
    return this.adminCompanyOwnerService.listCompanyOwners(auth);
  }

  @Get('/:id')
  companyOwnerDetail(
    @Req() auth: AuthRequestDto,
    @Param('id') id: string,
  ): Promise<CompanyOwnerDetailListResponseDto> {
    return this.adminCompanyOwnerService.companyOwnerDetail(auth, id);
  }

  @Put()
  updateCompanyOwner(
    @Req() auth: AuthRequestDto,
    @Body() req: UpdateCompanyOwnerRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.adminCompanyOwnerService.updateCompanyOwner(auth, req);
  }

  @Delete()
  deleteCompanyOwner(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.adminCompanyOwnerService.deleteCompanyOwner(auth, req);
  }
}
