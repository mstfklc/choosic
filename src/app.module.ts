import { Module } from '@nestjs/common';
import { SpotifyModule } from './spotify/spotify.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalJwtModule } from './custom/jwt/globalJwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './custom/aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AwsModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    GlobalJwtModule,
    SpotifyModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
