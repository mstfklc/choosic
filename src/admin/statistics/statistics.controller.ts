import { Body, Controller, Get } from '@nestjs/common';
//import { IdRequestDto } from '../../globalDto/idRequestDto';
import { StatisticsResponseDto } from './dto/response/statistics.response.dto';
import { StatisticsRequestDto } from './dto/request/statistics.request.dto';
import { StatisticsService } from './statistics.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('custom-range')
  @ApiOkResponse({ type: [StatisticsResponseDto] })
  async getCustomRangeStatistics(
    @Body() request: StatisticsRequestDto,
  ): Promise<StatisticsResponseDto[]> {
    return this.statisticsService.getCustomRangeStatistics(request);
  }
}
