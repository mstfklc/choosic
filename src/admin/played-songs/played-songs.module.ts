import { Module } from '@nestjs/common';
import { PlayedSongsService } from './played-songs.service';
import { PlayedSongsController } from './played-songs.controller';

@Module({
  providers: [PlayedSongsService],
  controllers: [PlayedSongsController],
})
export class PlayedSongsModule {}
