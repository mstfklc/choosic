import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginRequest } from './request/adminLoginRequest';
import { LoginResponseDto } from '../../globalDto/loginResponseDto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('admin')
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}

  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDto })
  login(@Body() req: AdminLoginRequest): Promise<LoginResponseDto> {
    return this.authService.login(req);
  }
}
