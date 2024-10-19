import { Module } from '@nestjs/common';
import { BusinessFeedbackService } from './business.feedback.service';
import { BusinessFeedbackController } from './business.feedback.controller';

@Module({
  providers: [BusinessFeedbackService],
  controllers: [BusinessFeedbackController],
})
export class BusinessFeedbackModule {}
