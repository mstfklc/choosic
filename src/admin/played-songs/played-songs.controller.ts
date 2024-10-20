import { Body, Controller, Get, Req } from '@nestjs/common';
import { PlayedSongsService } from './played-songs.service';
import { PlayedSongsRequestDto } from './dto/request/playedsongs.request.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';
import { PlayedSongsResponseDto } from './dto/response/playedsongs.response.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@Controller('played-songs')
@ApiTags('admin/played-songs')
export class PlayedSongsController {
  constructor(private readonly playedSongsService: PlayedSongsService) {}

  @Get('custom-range')
  @ApiOkResponse({ type: PlayedSongsResponseDto })
  async getCustomRangeHistory(
    @Req() auth: AuthRequestDto,
    @Body() req: PlayedSongsRequestDto,
  ): Promise<PlayedSongsResponseDto> {
    return this.playedSongsService.getCustomRangeHistory(auth, req);
  }
}
