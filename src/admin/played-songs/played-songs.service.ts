import { Injectable } from '@nestjs/common';
import { PlayedSongsResponseDto } from './dto/response/playedsongs.response.dto';
import { PlayedSongsRequestDto } from './dto/request/playedsongs.request.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';

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

  async getCustomRangeHistory(
    auth: AuthRequestDto,
    req: PlayedSongsRequestDto,
  ): Promise<PlayedSongsResponseDto> {
    const { companyId, startDate, endDate } = req;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const filteredSongs = this.musicHistory.filter(
      (music) =>
        music.companyId === companyId &&
        music.playedAt >= start &&
        music.playedAt <= end,
    );

    const filteredSongsMap = filteredSongs.map((music) => ({
      coverImage: music.coverImage,
      musicName: music.musicName,
      artistName: music.artistName,
      playedAt: music.playedAt,
    }));

    return { items: filteredSongsMap };
  }
}
