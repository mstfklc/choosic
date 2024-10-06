import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../schemas/admin.schema';
import { Model } from 'mongoose';

import { LoginRequest } from '../auth/dto/request/loginRequest';
import { LoginResponseDto } from '../auth/dto/response/loginResponseDto';

import { CommonService } from '../common/common.service';
import { RefreshTokenDTO } from '../custom/jwt/dto/refresh-token.dto';
import { UserTokensDto } from '../custom/jwt/dto/user-tokens.dto';
import { IdRequestDto } from '../globalDto/idRequestDto';
import { User } from '../schemas/user.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private commonService: CommonService,
  ) {}

  async loginAdmin(req: LoginRequest): Promise<LoginResponseDto> {
    const userId = await this.commonService.validateUser(req);
    await this.commonService.validatePassword(req);
    return await this.commonService.createTokens(userId);
  }

  async findAllAdmin(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findAdminById(idReq: IdRequestDto): Promise<Admin> {
    return this.adminModel.findById(idReq).exec();
  }

  async findUserById(idReq: IdRequestDto): Promise<User> {
    return this.userModel.findById(idReq).exec();
  }

  async findAdminByUsername(userName: string): Promise<Admin> {
    return this.adminModel.findOne({ UserName: userName }).exec();
  }

  async findUserByUsername(userName: string): Promise<User> {
    return this.userModel.findOne({ UserName: userName }).exec();
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDTO,
  ): Promise<UserTokensDto | undefined> {
    return this.commonService.refreshToken(refreshTokenDto);
  }
}
