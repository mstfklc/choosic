import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Company } from '../../schemas/company.schema';
import { User } from '../../schemas/user.schema';
import { SummaryResponseDto } from './dto/response/summaryResponse.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';

@Injectable()
export class SummaryService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: mongoose.Model<Company>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSummaryData(auth: AuthRequestDto): Promise<SummaryResponseDto> {
    const companyCount = await this.companyModel.countDocuments();
    const userCount = await this.userModel.countDocuments();
    return {
      totalPlayedSongs: 0,
      totalEarningPrice: 0,
      totalCompanyCount: companyCount,
      totalUserCount: userCount,
    };
  }
}
