import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PlaylistMusicService } from './playlist-music.service';
import { PlaylistSongsRequestDTO } from './dto/request/playlist.songs.request.dto';
import { PlaylistSongsResponseDto } from './dto/response/playlist.songs.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';

@Controller('playlist-music')
export class PlaylistMusicController {
  constructor(private readonly playlistMusicService: PlaylistMusicService) {}

  @Get()
  async getPlaylist(@Body() id: string) {
    return this.playlistMusicService.getPlaylistsByCompanyId(id);
  }

  @Post('/create')
  async createPlaylist(
    @Body() companyId: string,
    @Body() newPlaylist: { name: string; songs: string[] },
  ) {
    return this.playlistMusicService.createPlaylist(companyId, newPlaylist);
  }

  @Get('/songs')
  async getPlaylistSongs(
    @Req() auth: AuthRequestDto,
    @Body() req: PlaylistSongsRequestDTO,
  ): Promise<PlaylistSongsResponseDto> {
    return this.playlistMusicService.getPlayListSongs(auth, req);
  }

  @Get('/search')
  async searchSong(
    @Req() auth: AuthRequestDto,
    @Query('songName') songName: string,
  ) {
    return this.playlistMusicService.searchSongsByName(auth, songName);
  }

  @Post(':companyId/:playlistId/songs')
  async addSongToPlaylist(
    @Param('companyId') companyId: string,
    @Param('playlistId') playlistId: string,
    @Body()
    song: {
      coverImage: string;
      musicName: string;
      artistName: string;
    },
  ) {
    return this.playlistMusicService.addSongToPlaylist(
      companyId,
      playlistId,
      song,
    );
  }

  @Delete('/song')
  async deleteSong(
    @Req() auth: AuthRequestDto,
    @Body() req: PlaylistSongsRequestDTO,
  ) {
    return this.playlistMusicService.removeSongFromPlaylist(auth, req);
  }
}
