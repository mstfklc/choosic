import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  async;

  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async getUsersSpecificData(): Promise<Partial<User>[]> {
    return this.userModel.find({}, { Username: 1, Email: 1 }).exec();
  }
}
