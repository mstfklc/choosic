import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { SummaryModule } from './summary/summary.module';
import { BusinessModule } from './business/business.module';
import { StatisticsModule } from './statistics/statistics.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UsersModule } from './users/users.module';
import { PlayedSongsModule } from './played-songs/played-songs.module';
import { PlaylistMusicModule } from './playlist-music/playlist-music.module';

@Module({
  imports: [
    AdminAuthModule,
    SummaryModule,
    BusinessModule,
    StatisticsModule,
    FeedbackModule,
    UsersModule,
    PlayedSongsModule,
    PlaylistMusicModule,
  ],
})
export class AdminModule {}
