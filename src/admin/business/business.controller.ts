import { Body, Controller, Delete, Get, HttpCode } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDetailDto } from './dto/business.detail.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('/details')
  @ApiOkResponse({ type: BusinessDetailDto })
  async getBusinessDetails(
    @Body() idRequestDto: IdRequestDto,
  ): Promise<BusinessDetailDto> {
    return this.businessService.getCompanyDetails(idRequestDto);
  }

  @Delete()
  @ApiOkResponse({
    description: 'Company successfully deleted',
  })
  @HttpCode(204)
  async deleteCompanyById(
    @Body('id') idRequestDto: IdRequestDto,
  ): Promise<void> {
    return this.businessService.deleteCompany(idRequestDto);
  }
}
