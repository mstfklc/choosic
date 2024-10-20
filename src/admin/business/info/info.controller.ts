import { Body, Controller, Get, Put } from '@nestjs/common';
import { InfoService } from './info.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { BusinessInfoDto } from './dto/response/business.info.dto';
import { Company } from '../../../schemas/company.schema';
import { UpdateBusinessInfoDto } from './dto/response/update.business.info.dto';
import { ResponseMessage } from '../../../custom/decorator/response.message.decorator';
import { CompanyOwnerInfoDto } from './dto/response/camponyowner.info.dto';
import { CompanyStaffInfoDto } from './dto/response/companystaff.info.dto';

@Controller('business/info')
@ApiTags('business/info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('owner')
  @ApiOkResponse({ type: CompanyOwnerInfoDto })
  @ResponseMessage('Get it owner info successfully')
  async getCompanyOwnerInfo(
    @Body() req: IdRequestDto,
  ): Promise<CompanyOwnerInfoDto> {
    return this.infoService.getCompanyOwnerInfo(req);
  }

  @Get('staff')
  @ApiOkResponse({ type: CompanyStaffInfoDto })
  @ResponseMessage('Get it staff info successfully')
  async getCompanyStaffInfo(
    @Body() req: IdRequestDto,
  ): Promise<CompanyStaffInfoDto> {
    return this.infoService.getCompanyStaffInfo(req);
  }

  @Get()
  @ApiOkResponse({ type: BusinessInfoDto })
  @ResponseMessage('Get it company info successfully')
  async getCompanyInfo(@Body() req: IdRequestDto): Promise<BusinessInfoDto> {
    return await this.infoService.getCompanyInfo(req);
  }

  @Put('/update')
  @ApiOkResponse({ type: Company })
  @ResponseMessage('Company updated successfully')
  async updateCompanyInfo(
    @Body() req: IdRequestDto,
    @Body() updateBusinessInfoDto: UpdateBusinessInfoDto,
  ): Promise<Company> {
    return await this.infoService.updateBusinessInfo(
      req,
      updateBusinessInfoDto,
    );
  }
}
