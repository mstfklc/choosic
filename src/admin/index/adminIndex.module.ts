import { Module } from '@nestjs/common';
import { AdminIndexController } from './adminIndex.controller';
import { AdminIndexService } from './adminIndex.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { AuthService } from '../../auth/auth.service';
import { RolesGuard } from '../../custom/rbac/rbacGuard';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AdminIndexController],
  providers: [AdminIndexService, AuthService, RolesGuard],
})
export class AdminIndexModule {}
