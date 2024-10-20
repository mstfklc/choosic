import { Body, Controller, Get, Put } from '@nestjs/common';
import { InfoService } from './info.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { BusinessInfoDto } from '../dto/business.info.dto';
import { Company } from '../../../schemas/company.schema';
import { UpdateBusinessInfoDto } from '../dto/update.business.info.dto';
import { ResponseMessage } from '../../../custom/decorator/response.message.decorator';

@Controller('business/info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

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
