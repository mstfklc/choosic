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

  async getDailyStatistics(
    companyId: string,
  ): Promise<StatisticsResponseDto[]> {
    const today = new Date();
    const filteredStats = this.statisticsData.filter(
      (stat) =>
        stat.companyId === companyId &&
        stat.date.toDateString() === today.toDateString(),
    );

    return this.mapToDto(filteredStats);
  }

  async getWeeklyStatistics(
    companyId: string,
  ): Promise<StatisticsResponseDto[]> {
    const today = new Date();
    const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
    const filteredStats = this.statisticsData.filter(
      (stat) =>
        stat.companyId === companyId &&
        stat.date > oneWeekAgo &&
        stat.date <= new Date(),
    );

    return this.mapToDto(filteredStats);
  }

  async getMonthlyStatistics(
    companyId: string,
  ): Promise<StatisticsResponseDto[]> {
    const today = new Date();
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
    const filteredStats = this.statisticsData.filter(
      (stat) =>
        stat.companyId === companyId &&
        stat.date > oneMonthAgo &&
        stat.date <= new Date(),
    );

    return this.mapToDto(filteredStats);
  }

  async getYearlyStatistics(
    companyId: string,
  ): Promise<StatisticsResponseDto[]> {
    const today = new Date();
    const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
    const filteredStats = this.statisticsData.filter(
      (stat) =>
        stat.companyId === companyId &&
        stat.date > oneYearAgo &&
        stat.date <= new Date(),
    );

    return this.mapToDto(filteredStats);
  }

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
