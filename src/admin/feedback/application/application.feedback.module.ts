import { Module } from '@nestjs/common';
import { ApplicationFeedbackService } from './application.feedback.service';
import { ApplicationFeedbackController } from './application.feedback.controller';

@Module({
  providers: [ApplicationFeedbackService],
  controllers: [ApplicationFeedbackController],
})
export class ApplicationFeedbackModule {}
