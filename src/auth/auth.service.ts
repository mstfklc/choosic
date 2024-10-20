import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import mongoose from 'mongoose';
import { LoginResponseDto } from './dto/response/loginResponseDto';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dto/request/registerRequestDto';
import { throwApiError } from '../custom/http.utility';
import { CustomExceptionCode } from '../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../enum/apiError.enum';
import * as bcrypt from 'bcrypt';
import { Role } from '../enum/role.enum';
import { LoginRequest } from './dto/request/loginRequest';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async findUserById(userId: string): Promise<User | undefined> {
    return this.userModel.findById(userId).exec();
  }

  async registerUser(req: RegisterRequestDto): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({
      UserName: req.Username,
      IsDeleted: false,
    });
    if (user) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_user_already_exist,
      );
    }
    if (req.AgreementAcceptance !== true) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_agreement_not_accepted,
      );
    }
    const userEmail = await this.userModel.findOne({
      Email: req.Email,
      IsDeleted: true,
    });
    if (userEmail) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_email_already_exist,
      );
    }
    const hashedPassword = await bcrypt.hash(req.Password, 10);
    const newUser = await this.userModel.create({
      Username: req.Username,
      Name: req.Name,
      Surname: req.Surname,
      Phone: req.Phone,
      Email: req.Email,
      Roles: Role.User,
      PasswordHashed: hashedPassword,
      AgreementAcceptance: true,
    });
    const findUser = await this.userModel.findOne({
      _id: newUser._id,
    });

    if (!findUser) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    const jwtToken = this.jwtService.sign({
      id: newUser._id,
    });
    return {
      accessToken: jwtToken,
    };
  }

  async loginAdmin(req: LoginRequest): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({
      UserName: req.username,
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
    const jwtToken = this.jwtService.sign({
      id: user._id,
    });
    return {
      accessToken: jwtToken,
    };
  }

  async loginCompanyOwner(req: LoginRequest): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({
      UserName: req.username,
      IsDeleted: false,
      Roles: [Role.CompanyOwner],
      IsActive: true,
    });
    if (!user) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
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
    const jwtToken = this.jwtService.sign({
      id: user._id,
    });
    return {
      accessToken: jwtToken,
    };
  }
}
