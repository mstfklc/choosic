import { Module } from '@nestjs/common';
import { SpotifyModule } from './spotify/spotify.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalJwtModule } from './custom/jwt/globalJwt.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    GlobalJwtModule,
    SpotifyModule,
  ],
})
export class AppModule {}
