import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { InfoModule } from './info/info.module';
import { AccountsModule } from './accounts/accounts.module';
import { DetailsModule } from './details/details.module';

@Module({
  providers: [BusinessService],
  controllers: [BusinessController],
  imports: [InfoModule, AccountsModule, DetailsModule]
})
export class BusinessModule {}
