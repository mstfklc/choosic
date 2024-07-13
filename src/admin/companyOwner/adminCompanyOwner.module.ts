import { Module } from '@nestjs/common';
import { AdminCompanyOwnerService } from './adminCompanyOwner.service';
import { AdminCompanyOwnerController } from './adminCompanyOwner.controller';
import { CompanySchema } from '../../schemas/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { AuthService } from '../../auth/auth.service';
import { RolesGuard } from '../../custom/rbac/rbacGuard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  providers: [AdminCompanyOwnerService, AuthService, RolesGuard],
  controllers: [AdminCompanyOwnerController],
})
export class AdminCompanyOwnerModule {}
