import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PlaylistMusicService } from './playlist-music.service';
import { PlaylistSongsRequestDTO } from './dto/request/playlist.songs.request.dto';
import { PlaylistSongsResponseDto } from './dto/response/playlist.songs.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { RemoveSongsRequestDTO } from './dto/request/remove.song.request.dto';
import { SongsResponseDto } from './dto/response/song.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlist-music')
@ApiTags('admin/playlist-music')
export class PlaylistMusicController {
  constructor(private readonly playlistMusicService: PlaylistMusicService) {}

  @Get()
  async getPlaylist(@Body() id: string) {
    return this.playlistMusicService.getPlaylistsByCompanyId(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiParam({ name: 'companyId', description: 'ID of the company' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        songs: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  async createPlaylist(
    @Param('companyId') companyId: string,
    @Body() newPlaylist: { name: string; songs: string[] },
  ) {
    return this.playlistMusicService.createPlaylist(companyId, newPlaylist);
  }

  @Get('/songs')
  @ApiOkResponse({ type: PlaylistSongsResponseDto })
  async getPlaylistSongs(
    @Req() auth: AuthRequestDto,
    @Body() req: PlaylistSongsRequestDTO,
  ): Promise<PlaylistSongsResponseDto> {
    return this.playlistMusicService.getPlayListSongs(auth, req);
  }

  @Get('/search')
  @ApiOkResponse({ type: SongsResponseDto })
  async searchSong(
    @Req() auth: AuthRequestDto,
    @Query('songName') songName?: string,
  ): Promise<SongsResponseDto> {
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
  @ApiOkResponse({ description: 'Song deleted successfully' })
  async deleteSong(
    @Req() auth: AuthRequestDto,
    @Body() req: RemoveSongsRequestDTO,
  ) {
    return this.playlistMusicService.removeSongFromPlaylist(auth, req);
  }
}
