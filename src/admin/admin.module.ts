import { Module } from '@nestjs/common';
import { AdminIndexModule } from './index/adminIndex.module';
import { AdminCompanyOwnerModule } from './companyOwner/adminCompanyOwner.module';
import { AdminCompanyModule } from './company/adminCompany.module';

@Module({
  imports: [AdminIndexModule, AdminCompanyOwnerModule, AdminCompanyModule],
})
export class AdminModule {}
