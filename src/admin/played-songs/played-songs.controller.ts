import { Body, Controller, Get } from '@nestjs/common';
import { PlayedSongsService } from './played-songs.service';
import { PlayedSongsRequestDto } from './dto/request/playedsongs.request.dto';
import { PlayedsongsResponseDto } from './dto/response/playedsongs.response.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { ApiTags } from '@nestjs/swagger';

@Controller('played-songs')
@ApiTags('admin/played-songs')
export class PlayedSongsController {
  constructor(private readonly playedSongsService: PlayedSongsService) {}

  @Get('daily')
  getDailyHistory(@Body() request: IdRequestDto) {
    return this.playedSongsService.getDailyHistory(request.id.toString());
  }

  @Get('weekly')
  getWeeklyHistory(@Body() request: IdRequestDto) {
    return this.playedSongsService.getWeeklyHistory(request.id.toString());
  }

  @Get('monthly')
  getMonthlyHistory(@Body() request: IdRequestDto) {
    return this.playedSongsService.getMonthlyHistory(request.id.toString());
  }

  @Get('yearly')
  getYearlyHistory(@Body() request: IdRequestDto) {
    return this.playedSongsService.getYearlyHistory(request.id.toString());
  }

  @Get('custom-range')
  async getCustomRangeHistory(
    @Body() request: PlayedSongsRequestDto,
  ): Promise<PlayedsongsResponseDto[]> {
    return this.playedSongsService.getCustomRangeHistory(request);
  }
}
