import { Module } from '@nestjs/common';
import { PlaylistMusicService } from './playlist-music.service';
import { PlaylistMusicController } from './playlist-music.controller';

@Module({
  providers: [PlaylistMusicService],
  controllers: [PlaylistMusicController],
})
export class PlaylistMusicModule {}
