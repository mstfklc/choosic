import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/response/loginResponseDto';
import { RegisterRequestDto } from './dto/request/registerRequestDto';
import { LoginRequest } from './dto/request/loginRequest';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() req: RegisterRequestDto): Promise<LoginResponseDto> {
    return this.authService.registerAdmin(req);
  }

  @Post('/login')
  login(@Body() req: LoginRequest): Promise<LoginResponseDto> {
    return this.authService.loginAdmin(req);
  }

  @Post('/login-company-owner')
  loginCompanyOwner(@Body() req: LoginRequest): Promise<LoginResponseDto> {
    return this.authService.loginCompanyOwner(req);
  }
}
