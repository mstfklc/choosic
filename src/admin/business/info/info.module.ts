import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from '../../../schemas/company.schema';
import { CompanyOwnerSchema } from '../../../schemas/companyOwner.schema';
import { CompanyStaffSchema } from '../../../schemas/companyStaff.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Company', schema: CompanySchema },
      { name: 'CompanyOwner', schema: CompanyOwnerSchema },
      { name: 'CompanyStaff', schema: CompanyStaffSchema },
    ]),
  ],
  providers: [InfoService],
  controllers: [InfoController],
})
export class InfoModule {}
