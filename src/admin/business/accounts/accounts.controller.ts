import { Body, Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { CompanyOwnerInfoDto } from '../dto/camponyowner.info.dto';
import { CompanyStaffInfoDto } from '../dto/companystaff.info.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseMessage } from '../../../custom/decorator/response.message.decorator';

@Controller('business/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('owner')
  @ApiOkResponse({ type: CompanyOwnerInfoDto })
  @ResponseMessage('Get it owner info successfully')
  async getCompanyOwnerInfo(
    @Body() req: IdRequestDto,
  ): Promise<CompanyOwnerInfoDto> {
    return this.accountsService.getCompanyOwnerInfo(req);
  }

  @Get('staff')
  @ApiOkResponse({ type: CompanyStaffInfoDto })
  @ResponseMessage('Get it staff info successfully')
  async getCompanyStaffInfo(
    @Body() req: IdRequestDto,
  ): Promise<CompanyStaffInfoDto> {
    return this.accountsService.getCompanyStaffInfo(req);
  }
}
