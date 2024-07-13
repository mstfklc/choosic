import { Module } from '@nestjs/common';
import { AdminCompanyController } from './adminCompany.controller';
import { AdminCompanyService } from './adminCompany.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { CompanySchema } from '../../schemas/company.schema';
import { AuthService } from '../../auth/auth.service';
import { RolesGuard } from '../../custom/rbac/rbacGuard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [AdminCompanyController],
  providers: [AdminCompanyService, AuthService, RolesGuard],
})
export class AdminCompanyModule {}
