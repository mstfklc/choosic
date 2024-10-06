import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginRequest } from './request/adminLoginRequest';
import { LoginResponseDto } from '../../globalDto/loginResponseDto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminRegisterRequestDto } from './request/adminregisterRequest.dto';

@Controller('admin')
@ApiTags('admin')
export class AdminAuthController {
  constructor(
    private authService: AdminAuthService,
    private adminAuthService: AdminAuthService,
  ) {}

  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDto })
  login(@Body() req: AdminLoginRequest): Promise<LoginResponseDto> {
    return this.authService.login(req);
  }

  @Post('/signup')
  @ApiOkResponse({ type: LoginResponseDto })
  signUp(@Body() req: AdminRegisterRequestDto): Promise<LoginResponseDto> {
    return this.adminAuthService.create(req);
  }
}
