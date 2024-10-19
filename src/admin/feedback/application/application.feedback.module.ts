import { Module } from '@nestjs/common';
import { ApplicationFeedbackService } from './application.feedback.service';
import { ApplicationFeedbackController } from './application.feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackApplicationSchema } from '../../../schemas/feedbackApplication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FeedbackApplication', schema: FeedbackApplicationSchema },
    ]),
  ],
  providers: [ApplicationFeedbackService],
  controllers: [ApplicationFeedbackController],
})
export class ApplicationFeedbackModule {}
