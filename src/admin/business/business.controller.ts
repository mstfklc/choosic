import { Body, Controller, Get, Req } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDetailDto } from './dto/business.detail.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('/details')
  @ApiOkResponse({ type: BusinessDetailDto })
  async getBusinessDetails(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
  ): Promise<BusinessDetailDto> {
    return this.businessService.getCompanyDetails(auth, req);
  }
}
