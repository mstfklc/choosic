import { Body, Controller, Get } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDetailDto } from './dto/business.detail.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('/details')
  async getBusinessDetails(
    @Body() idRequestDto: IdRequestDto,
  ): Promise<BusinessDetailDto> {
    return this.businessService.getCompanyDetails(idRequestDto);
  }
}
