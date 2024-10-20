import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from '../../schemas/company.schema';
import { CompanyOwnerSchema } from '../../schemas/companyOwner.schema';
import { CompanyStaffSchema } from '../../schemas/companyStaff.schema';
import { AwsService } from '../../custom/aws/aws.service';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    InfoModule,
    MongooseModule.forFeature([
      { name: 'Company', schema: CompanySchema },
      { name: 'CompanyOwner', schema: CompanyOwnerSchema },
      { name: 'CompanyStaff', schema: CompanyStaffSchema },
    ]),
  ],
  providers: [BusinessService, AwsService],
  controllers: [BusinessController],
})
export class BusinessModule {}
