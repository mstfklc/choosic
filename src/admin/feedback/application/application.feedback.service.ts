import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedbackApplication } from '../../../schemas/feedbackApplication.schema';
import { Model } from 'mongoose';
import { FeedbackApplicationDto } from '../dto/feedback.application.dto';

@Injectable()
export class ApplicationFeedbackService {
  constructor(
    @InjectModel(FeedbackApplication.name)
    private readonly feedbackApplicationModel: Model<FeedbackApplication>,
  ) {}

  async getAllFeedBack(): Promise<FeedbackApplicationDto[]> {
    const feedbacks = await this.feedbackApplicationModel
      .find()
      .select('UserId Message CreatedAt')
      .exec();

    return feedbacks.map((feedback) => ({
      UserId: feedback.UserId?.toString(),
      Message: feedback.Message,
      CreatedAt: feedback.CreatedAt,
    }));
  }

  async getFeedbackByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<FeedbackApplicationDto[]> {
    const feedbacks = await this.feedbackApplicationModel
      .find({
        sentAt: { $gte: startDate, $lte: endDate },
      })
      .select('UserId Message CreatedAt')
      .exec();

    return feedbacks.map((feedback) => ({
      UserId: feedback.UserId?.toString(),
      Message: feedback.Message,
      CreatedAt: feedback.CreatedAt,
    }));
  }
}
