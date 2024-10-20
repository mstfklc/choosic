import { Injectable } from '@nestjs/common';
import { PlayedsongsResponseDto } from './dto/response/playedsongs.response.dto';
import { PlayedSongsRequestDto } from './dto/request/playedsongs.request.dto';

@Injectable()
export class PlayedSongsService {
  private musicHistory = [
    {
      id: 1,
      companyId: '1',
      coverImage: 'cover1.jpg',
      musicName: 'Song A',
      artistName: 'Artist 1',
      playedAt: new Date('2024-10-19T10:00:00'),
    },
    {
      id: 2,
      companyId: '1',
      coverImage: 'cover2.jpg',
      musicName: 'Song B',
      artistName: 'Artist 2',
      playedAt: new Date('2024-10-18T14:30:00'),
    },
    {
      id: 3,
      companyId: '1',
      coverImage: 'cover3.jpg',
      musicName: 'Song C',
      artistName: 'Artist 3',
      playedAt: new Date('2024-09-25T09:15:00'),
    },
  ];

  async getDailyHistory(companyId: string): Promise<PlayedsongsResponseDto[]> {
    const today = new Date();
    const filteredSongs = this.musicHistory.filter(
      (music) =>
        music.companyId === companyId &&
        music.playedAt.toDateString() === today.toDateString(),
    );

    return this.mapToDto(filteredSongs);
  }

  async getWeeklyHistory(companyId: string): Promise<PlayedsongsResponseDto[]> {
    const today = new Date();
    const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
    const filteredSongs = this.musicHistory.filter(
      (music) =>
        music.companyId === companyId &&
        music.playedAt > oneWeekAgo &&
        music.playedAt <= new Date(),
    );

    return this.mapToDto(filteredSongs);
  }

  async getMonthlyHistory(
    companyId: string,
  ): Promise<PlayedsongsResponseDto[]> {
    const today = new Date();
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
    const filteredSongs = this.musicHistory.filter(
      (music) =>
        music.companyId === companyId &&
        music.playedAt > oneMonthAgo &&
        music.playedAt <= new Date(),
    );

    return this.mapToDto(filteredSongs);
  }

  async getYearlyHistory(companyId: string): Promise<PlayedsongsResponseDto[]> {
    const today = new Date();
    const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
    const filteredSongs = this.musicHistory.filter(
      (music) =>
        music.companyId === companyId &&
        music.playedAt > oneYearAgo &&
        music.playedAt <= new Date(),
    );

    return this.mapToDto(filteredSongs);
  }

  async getCustomRangeHistory(
    req: PlayedSongsRequestDto,
  ): Promise<PlayedsongsResponseDto[]> {
    const { companyId, startDate, endDate } = req;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const filteredSongs = this.musicHistory.filter(
      (music) =>
        music.companyId === companyId &&
        music.playedAt >= start &&
        music.playedAt <= end,
    );

    return this.mapToDto(filteredSongs);
  }

  private mapToDto(musicHistory: any[]): PlayedsongsResponseDto[] {
    return musicHistory.map((music) => ({
      coverImage: music.coverImage,
      musicName: music.musicName,
      artistName: music.artistName,
      playedAt: music.playedAt,
    }));
  }
}
