import { Module } from '@nestjs/common';
import { BusinessFeedbackService } from './business.feedback.service';
import { BusinessFeedbackController } from './business.feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackBusinessSchema } from '../../../schemas/feedbackBusiness.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FeedbackBusiness', schema: FeedbackBusinessSchema },
    ]),
  ],
  providers: [BusinessFeedbackService],
  controllers: [BusinessFeedbackController],
})
export class BusinessFeedbackModule {}
