import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { CompanySchema } from '../../../schemas/company.schema';
import { CompanyOwnerSchema } from '../../../schemas/companyOwner.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CompanyOwner', schema: CompanyOwnerSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
