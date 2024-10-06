import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminSchema } from '../../schemas/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
  ],
  providers: [AdminAuthService],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
