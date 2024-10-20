import { Injectable } from '@nestjs/common';
import { throwApiError } from '../../custom/http.utility';
import { CustomExceptionCode } from '../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../enum/apiError.enum';
import { SongsResponseDto } from './dto/response/song.response.dto';
import { PlaylistSongsResponseDto } from './dto/response/playlist.songs.dto';
import { PlaylistSongsRequestDTO } from './dto/request/playlist.songs.request.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { RemoveSongsRequestDTO } from './dto/request/remove.song.request.dto';

@Injectable()
export class PlaylistMusicService {
  private playlists: any[] = [
    {
      id: '1',
      companyId: '1',
      name: 'Chill Vibes',
      songs: [
        {
          coverImage: 'https://example.com/song1.jpg',
          musicName: 'Song A',
          artistName: 'Artist A',
          addedAt: new Date('2024-01-01T12:00:00'),
        },
        {
          coverImage: 'https://example.com/song2.jpg',
          musicName: 'Song B',
          artistName: 'Artist B',
          addedAt: new Date('2024-01-02T12:00:00'),
        },
      ],
    },
    {
      id: '2',
      companyId: '1',
      name: 'Workout Mix',
      songs: [
        {
          coverImage: 'https://example.com/song3.jpg',
          musicName: 'Song C',
          artistName: 'Artist C',
          addedAt: new Date('2024-01-03T12:00:00'),
        },
        {
          coverImage: 'https://example.com/song4.jpg',
          musicName: 'Song D',
          artistName: 'Artist D',
          addedAt: new Date('2024-01-04T12:00:00'),
        },
      ],
    },
    {
      id: '3',
      companyId: '2',
      name: 'Party Hits',
      songs: [
        {
          coverImage: 'https://example.com/song5.jpg',
          musicName: 'Song E',
          artistName: 'Artist E',
          addedAt: new Date('2024-01-05T12:00:00'),
        },
        {
          coverImage: 'https://example.com/song6.jpg',
          musicName: 'Song F',
          artistName: 'Artist F',
          addedAt: new Date('2024-01-06T12:00:00'),
        },
      ],
    },
    {
      id: '4',
      companyId: '2',
      name: 'Relaxing Tunes',
      songs: [
        {
          coverImage: 'https://example.com/song7.jpg',
          musicName: 'Song G',
          artistName: 'Artist G',
          addedAt: new Date('2024-01-07T12:00:00'),
        },
        {
          coverImage: 'https://example.com/song8.jpg',
          musicName: 'Song H',
          artistName: 'Artist H',
          addedAt: new Date('2024-01-08T12:00:00'),
        },
      ],
    },
    {
      id: '5',
      companyId: '3',
      name: 'Classic Favorites',
      songs: [
        {
          coverImage: 'https://example.com/song9.jpg',
          musicName: 'Song I',
          artistName: 'Artist I',
          addedAt: new Date('2024-01-09T12:00:00'),
        },
        {
          coverImage: 'https://example.com/song10.jpg',
          musicName: 'Song J',
          artistName: 'Artist J',
          addedAt: new Date('2024-01-10T12:00:00'),
        },
      ],
    },
  ];

  private songs: any[] = [
    {
      id: '1',
      coverImage: 'https://example.com/song1.jpg',
      musicName: 'Song A',
      artistName: 'Artist A',
    },
    {
      id: '2',
      coverImage: 'https://example.com/song2.jpg',
      musicName: 'Song B',
      artistName: 'Artist B',
    },
    {
      id: '3',
      coverImage: 'https://example.com/song3.jpg',
      musicName: 'Song C',
      artistName: 'Artist C',
    },
    {
      id: '4',
      coverImage: 'https://example.com/song4.jpg',
      musicName: 'Song D',
      artistName: 'Artist D',
    },
    {
      id: '5',
      coverImage: 'https://example.com/song5.jpg',
      musicName: 'Song E',
      artistName: 'Artist E',
    },
    {
      id: '6',
      coverImage: 'https://example.com/song6.jpg',
      musicName: 'Song F',
      artistName: 'Artist F',
    },
    {
      id: '7',
      coverImage: 'https://example.com/song7.jpg',
      musicName: 'Song G',
      artistName: 'Artist G',
    },
    {
      id: '8',
      coverImage: 'https://example.com/song8.jpg',
      musicName: 'Song H',
      artistName: 'Artist H',
    },
    {
      id: '9',
      coverImage: 'https://example.com/song9.jpg',
      musicName: 'Song I',
      artistName: 'Artist I',
    },
    {
      id: '10',
      coverImage: 'https://example.com/song10.jpg',
      musicName: 'Song J',
      artistName: 'Artist J',
    },
  ];

  async getPlaylistsByCompanyId(companyId: string): Promise<any[]> {
    return this.playlists.filter(
      (playlist) => playlist.companyId === companyId,
    );
  }

  async createPlaylist(
    companyId: string,
    newPlaylist: { name: string; songs: string[] },
  ): Promise<any> {
    const id = this.playlists.length + 1;
    this.playlists.push({ id, companyId, ...newPlaylist });
  }

  async getPlayListSongs(
    auth: AuthRequestDto,
    req: PlaylistSongsRequestDTO,
  ): Promise<PlaylistSongsResponseDto> {
    const playlist = this.playlists.find(
      (pl) =>
        pl.companyId === req.companyId && pl.id === parseInt(req.playlistId),
    );

    if (!playlist) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_playlist_not_found,
      );
    }
    const playListSongsMap = playlist.songs.map(
      (song: {
        coverImage: any;
        musicName: any;
        artistName: any;
        addedAt: any;
      }) => ({
        coverImage: song.coverImage,
        musicName: song.musicName,
        artistName: song.artistName,
        addedAt: song.addedAt,
      }),
    );

    return { items: playListSongsMap };
  }

  async searchSongsByName(
    auth: AuthRequestDto,
    name: string,
  ): Promise<SongsResponseDto> {
    const filteredSongs = this.songs.filter((song) =>
      song.musicName.toLowerCase().includes(name.toLowerCase()),
    );

    if (!filteredSongs || filteredSongs.length === 0) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_song_not_found,
      );
    }

    const filteredSongMap = filteredSongs.map((song) => ({
      coverImage: song.coverImage,
      musicName: song.musicName,
      artistName: song.artistName,
    }));

    return { items: filteredSongMap };
  }

  async addSongToPlaylist(
    companyId: string,
    playlistId: string,
    song: {
      coverImage: string;
      musicName: string;
      artistName: string;
    },
  ): Promise<any> {
    const playlist = this.playlists.find(
      (pl) => pl.companyId === companyId && pl.id === parseInt(playlistId),
    );

    if (!playlist) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_playlist_not_found,
      );
    }
    const songExists = playlist.songs.some(
      (existingSong: { musicName: string }) =>
        existingSong.musicName === song.musicName,
    );
    if (songExists) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_song_already_exist,
      );
    }
  }

  async removeSongFromPlaylist(
    auth: AuthRequestDto,
    req: RemoveSongsRequestDTO,
  ): Promise<any> {
    const playlist = this.playlists.find(
      (pl) =>
        pl.companyId === req.companyId && pl.id === parseInt(req.playlistId),
    );

    if (!playlist) {
      throwApiError(
        CustomExceptionCode.NOT_FOUND,
        ApiErrorEnum.api_error_playlist_not_found,
      );
    }

    playlist.songs = playlist.songs.filter(
      (song: { musicName: string }) => song.musicName !== req.songName,
    );
  }
}
