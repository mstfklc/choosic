import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { throwApiError } from '../../http.utility';
import { CustomExceptionCode } from '../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../enum/apiError.enum';
import { User } from '../../../schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload) {
    const { sub } = payload;
    const user = await this.userModel.findOne({
      _id: sub,
      IsDeleted: false,
    });

    if (!user) {
      throwApiError(
        CustomExceptionCode.UNAUTHORIZED,
        ApiErrorEnum.api_error_unauthorized,
      );
    }

    return payload;
  }
}
