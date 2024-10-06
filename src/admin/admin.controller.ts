import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginRequest } from '../auth/dto/request/loginRequest';
import { LoginResponseDto } from '../auth/dto/response/loginResponseDto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/login-admin')
  login(@Body() req: LoginRequest): Promise<LoginResponseDto> {
    return this.adminService.loginAdmin(req);
  }
}
