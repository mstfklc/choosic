import { Injectable } from '@nestjs/common';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { FeedbackBusinessDto } from './dto/feedback.business.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FeedbackBusiness } from '../../schemas/feedbackBusiness.schema';
import { Model } from 'mongoose';
import { FeedbackApplicationDto } from './dto/feedback.application.dto';
import { FeedbackApplication } from '../../schemas/feedbackApplication.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(FeedbackBusiness.name)
    private readonly feedbackBusinessModel: Model<FeedbackBusiness>,
    @InjectModel(FeedbackApplication.name)
    private readonly feedbackApplicationModel: Model<FeedbackApplication>,
  ) {}

  async getFeedBackBusiness(req: IdRequestDto): Promise<FeedbackBusinessDto[]> {
    const feedbacks = await this.feedbackBusinessModel
      .find({ _id: req.id })
      .select('UserId Message CreatedAt')
      .exec();

    return feedbacks.map((feedback) => ({
      UserId: feedback.UserId?.toString(),
      Message: feedback.Message,
      CreatedAt: feedback.CreatedAt,
    }));
  }

  async getFeedbackBusinessByDate(
    req: IdRequestDto,
    startDate: Date,
    endDate: Date,
  ): Promise<FeedbackBusinessDto[]> {
    const feedbacks = await this.feedbackBusinessModel
      .find({
        _id: req.id,
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

  async getAllApplicationFeedBack(): Promise<FeedbackApplicationDto[]> {
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

  async getApplicationFeedbackByDate(
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
