import { Body, Controller, Get } from '@nestjs/common';
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
}
