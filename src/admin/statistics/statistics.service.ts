import { Injectable } from '@nestjs/common';
import { StatisticsResponseDto } from './dto/response/statistics.response.dto';
import { StatisticsRequestDto } from './dto/request/statistics.request.dto';

@Injectable()
export class StatisticsService {
  private statisticsData = [
    {
      id: 1,
      companyId: '1',
      musicPlayCount: 100,
      earnings: 2000,
      views: 1500,
      date: new Date('2024-10-19T00:00:00'),
    },
    {
      id: 2,
      companyId: '1',
      musicPlayCount: 80,
      earnings: 1500,
      views: 1200,
      date: new Date('2024-10-18T00:00:00'),
    },
    {
      id: 3,
      companyId: '2',
      musicPlayCount: 50,
      earnings: 800,
      views: 900,
      date: new Date('2024-10-17T00:00:00'),
    },
  ];

  async getCustomRangeStatistics(
    req: StatisticsRequestDto,
  ): Promise<StatisticsResponseDto[]> {
    const { companyId, startDate, endDate } = req;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const filteredStats = this.statisticsData.filter(
      (stat) =>
        stat.companyId === companyId && stat.date >= start && stat.date <= end,
    );

    return this.mapToDto(filteredStats);
  }

  private mapToDto(statisticsData: any[]): StatisticsResponseDto[] {
    return statisticsData.map((stat) => ({
      id: stat.id,
      musicPlayCount: stat.musicPlayCount,
      earnings: stat.earnings,
      views: stat.views,
      date: stat.date,
    }));
  }
}
