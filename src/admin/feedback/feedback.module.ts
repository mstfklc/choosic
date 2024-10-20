import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackBusinessSchema } from '../../schemas/feedbackBusiness.schema';
import { FeedbackApplicationSchema } from '../../schemas/feedbackApplication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FeedbackBusiness', schema: FeedbackBusinessSchema },
      { name: 'FeedbackApplication', schema: FeedbackApplicationSchema },
    ]),
  ],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
