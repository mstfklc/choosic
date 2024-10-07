import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedbackApplication } from '../../../schemas/feedback-application.schema';
import { Model } from 'mongoose';

@Injectable()
export class ApplicationFeedbackService {
  constructor(
    @InjectModel(FeedbackApplication.name)
    private readonly feedbackApplicationModel: Model<FeedbackApplication>,
  ) {}

  async getAllFeedBack(): Promise<FeedbackApplication[]> {
    return this.feedbackApplicationModel.find().exec();
  }

  async getFeedbackByVersion(): Promise<FeedbackApplication[]> {
    return this.feedbackApplicationModel.find({
      currentApplicationVersion: version,
    });
  }

  async getFeedbackByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<FeedbackApplication[]> {
    return this.feedbackApplicationModel
      .find({
        sentAt: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }
}
