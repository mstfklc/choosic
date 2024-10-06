import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CommonService } from '../common/common.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../schemas/admin.schema';
import { UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [AdminService, CommonService],
  controllers: [AdminController],
})
export class AdminModule {}
