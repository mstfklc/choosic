import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User } from '../../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { throwApiError } from '../../http.utility';
import { CustomExceptionCode } from '../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../enum/apiError.enum';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const { sub } = payload;
    const user = await this.userModel.findOne({
      _id: sub,
      refreshTokens: refreshToken,
    });

    if (!user) {
      throwApiError(
        CustomExceptionCode.UNAUTHORIZED,
        ApiErrorEnum.api_error_unauthorized,
      );
    }

    return { ...payload, refreshToken };
  }
}
