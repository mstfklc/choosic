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
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { SuccessResponseDto } from '../../globalDto/successResponseDto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { JwtAuthGuard } from '../../custom/jwt/guard/jwt.guard';
import { RolesGuard } from '../../custom/rbac/rbacGuard';
import { Roles } from '../../custom/rbac/role.decorator';
import { Role } from '../../enum/role.enum';
import { AddAdminRequest } from './dto/req/addAdminRequest';
import { AdminDetailResponse } from './dto/res/adminDetailResponse';
import { UpdateAdminRequest } from './dto/req/updateAdmınRequest';
import { AdminListResponseItem } from './dto/res/listAdminResponse';
import { AdminIndexService } from './adminIndex.service';

@Controller('admin')
@ApiTags('Admin')
@ApiSecurity('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminIndexController {
  constructor(private adminIndexService: AdminIndexService) {}

  @Post()
  addAdmin(
    @Req() auth: AuthRequestDto,
    @Body() req: AddAdminRequest,
  ): Promise<SuccessResponseDto> {
    return this.adminIndexService.addAdmin(auth, req);
  }

  @Delete()
  deleteAdmin(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.adminIndexService.deleteAdmin(auth, req);
  }

  @Get()
  listAdmins(@Req() auth: AuthRequestDto): Promise<AdminListResponseItem> {
    return this.adminIndexService.listAdmins(auth);
  }

  @Get('/:id')
  adminDetail(
    @Req() auth: AuthRequestDto,
    @Param('id') id: string,
  ): Promise<AdminDetailResponse> {
    return this.adminIndexService.adminDetail(auth, id);
  }

  @Put()
  updateAdmin(
    @Req() auth: AuthRequestDto,
    @Body() req: UpdateAdminRequest,
  ): Promise<SuccessResponseDto> {
    return this.adminIndexService.updateAdmin(auth, req);
  }
}
