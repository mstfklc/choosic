import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { CreateSpotifyDto } from './dto/create-spotify.dto';
import { UpdateSpotifyDto } from './dto/update-spotify.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('login')
  async login(@Query('state') state: string) {
    return this.spotifyService.login(state);
  }

  @Get('deneme')
  async callback(@Req() req, @Query('code') code, @Res() res) {
    return res.redirect(await this.spotifyService.deneme(req, code));
  }
  @Get('get-token')
  async getToken() {
    return this.spotifyService.getToken();
  }

  @Get('pause')
  async pause() {
    return this.spotifyService.pause();
  }

  @Get('skip-next')
  async skipNext() {
    return this.spotifyService.skipNext();
  }
  @Get('get-queue')
  async getQueue() {
    return this.spotifyService.getQueue();
  }

  @Get('play')
  async play() {
    return this.spotifyService.play();
  }

  @Get('change-play')
  async changePlay() {
    return this.spotifyService.changeAndPlay();
  }

  @Get('get-devices')
  async getDevices() {
    return this.spotifyService.getDevices();
  }

  @Get('get-playlist')
  async getPlaylist() {
    return this.spotifyService.getPlaylist();
  }
  @Get('playlist')
  async playlist() {
    return this.spotifyService.playlist();
  }

  @Get('add-que-track')
  @ApiQuery({
    name: 'uri',
    required: true,
  })
  async getPlaylistTracks(@Query('uri') uri: string) {
    return this.spotifyService.addQueTrack(uri);
  }

  @Post()
  create(@Body() createSpotifyDto: CreateSpotifyDto) {
    return this.spotifyService.create(createSpotifyDto);
  }

  @Get()
  findAll() {
    return this.spotifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spotifyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpotifyDto: UpdateSpotifyDto) {
    return this.spotifyService.update(+id, updateSpotifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spotifyService.remove(+id);
  }
}
