import { Body, Controller, Post } from '@nestjs/common';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { StatisticsResponseDto } from './dto/response/statistics.response.dto';
import { StatisticsRequestDto } from './dto/request/statistics.request.dto';
import { StatisticsService } from './statistics.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('statistics')
@ApiTags('admin/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post('daily')
  async getDailyStatistics(
    @Body() request: IdRequestDto,
  ): Promise<StatisticsResponseDto[]> {
    return this.statisticsService.getDailyStatistics(request.id.toString());
  }

  @Post('weekly')
  async getWeeklyStatistics(
    @Body() request: IdRequestDto,
  ): Promise<StatisticsResponseDto[]> {
    return this.statisticsService.getWeeklyStatistics(request.id.toString());
  }

  @Post('monthly')
  async getMonthlyStatistics(
    @Body() request: IdRequestDto,
  ): Promise<StatisticsResponseDto[]> {
    return this.statisticsService.getMonthlyStatistics(request.id.toString());
  }

  @Post('yearly')
  async getYearlyStatistics(
    @Body() request: IdRequestDto,
  ): Promise<StatisticsResponseDto[]> {
    return this.statisticsService.getYearlyStatistics(request.id.toString());
  }

  @Post('custom-range')
  async getCustomRangeStatistics(
    @Body() request: StatisticsRequestDto,
  ): Promise<StatisticsResponseDto[]> {
    return this.statisticsService.getCustomRangeStatistics(request);
  }
}
