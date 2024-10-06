import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { UserTokensDto } from '../custom/jwt/dto/user-tokens.dto';
import { TokenConfig, TokenConfigName } from '../config/token.config';
import { randomBytes } from 'crypto';
import { TokenPayload } from '../custom/jwt/payload/token.payload';
import { RefreshTokenDTO } from '../custom/jwt/dto/refresh-token.dto';
import { throwApiError } from '../custom/http.utility';
import { CustomExceptionCode } from '../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../enum/apiError.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../schemas/admin.schema';
import { LoginRequest } from '../auth/dto/request/loginRequest';
import { Role } from '../enum/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createTokens(
    userId: Types.ObjectId,
  ): Promise<UserTokensDto | undefined> {
    const tokenConfig =
      this.configService.getOrThrow<TokenConfig>(TokenConfigName);

    const accessTokenKey = randomBytes(64).toString('hex');
    const refreshTokenKey = randomBytes(64).toString('hex');

    const accessTokenPayload = new TokenPayload(
      userId,
      accessTokenKey,
      tokenConfig.accessTokenValidity,
    );

    const refreshTokenPayload = new TokenPayload(
      userId,
      refreshTokenKey,
      tokenConfig.refreshTokenValidity,
    );

    const accessToken = await this.jwtService.signAsync(accessTokenPayload);
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload);

    return new UserTokensDto({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDTO,
  ): Promise<UserTokensDto | undefined> {
    const payload = this.jwtService.verify(refreshTokenDto.refresh_token, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });

    const user = await this.adminModel.findById(payload.sub);

    if (!user) {
      throwApiError(
        CustomExceptionCode.UNAUTHORIZED,
        ApiErrorEnum.api_error_unauthorized,
      );
    }

    return this.createTokens(user._id);
  }

  async validateUser(req: LoginRequest): Promise<any> {
    const user = await this.adminModel.findOne({
      Username: req.username,
      IsDeleted: false,
      Roles: Role.Admin,
      IsActive: true,
    });
    if (!user) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    return user._id;
  }

  async validatePassword(req: LoginRequest) {
    const user = await this.validateUser(req);
    const isPasswordMatch = await bcrypt.compare(
      req.password,
      user.PasswordHashed,
    );
    if (!isPasswordMatch) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_password_not_match,
      );
    }
  }
}
