import { Module } from '@nestjs/common';
import { BusinessFeedbackModule } from './business/business.feedback.module';
import { ApplicationFeedbackModule } from './application/application.feedback.module';

@Module({
  imports: [BusinessFeedbackModule, ApplicationFeedbackModule],
})
export class FeedbackModule {}
