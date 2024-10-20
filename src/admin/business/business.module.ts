import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from '../../schemas/company.schema';
import { CompanyOwnerSchema } from '../../schemas/companyOwner.schema';
import { CompanyStaffSchema } from '../../schemas/companyStaff.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Company', schema: CompanySchema },
      { name: 'CompanyOwner', schema: CompanyOwnerSchema },
      { name: 'CompanyStaff', schema: CompanyStaffSchema },
    ]),
  ],
  providers: [BusinessService],
  controllers: [BusinessController],
})
export class BusinessModule {}
