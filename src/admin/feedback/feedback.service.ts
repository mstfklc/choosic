import { Injectable } from '@nestjs/common';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { FeedbackBusinessDto } from './dto/feedback.business.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FeedbackBusiness } from '../../schemas/feedbackBusiness.schema';
import { Model } from 'mongoose';
import { FeedbackApplicationDto } from './dto/feedback.application.dto';
import { FeedbackApplication } from '../../schemas/feedbackApplication.schema';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(FeedbackBusiness.name)
    private readonly feedbackBusinessModel: Model<FeedbackBusiness>,
    @InjectModel(FeedbackApplication.name)
    private readonly feedbackApplicationModel: Model<FeedbackApplication>,
  ) {}

  async getFeedBackBusiness(
    auth: AuthRequestDto,
    req: IdRequestDto,
  ): Promise<FeedbackBusinessDto> {
    const feedbacks = await this.feedbackBusinessModel
      .find({ _id: req.id })
      .select('UserId Message CreatedAt')
      .exec();

    const feedbacksMap = feedbacks.map((feedback) => ({
      UserId: feedback.UserId?.toString(),
      Message: feedback.Message,
      CreatedAt: feedback.CreatedAt,
    }));

    return { items: feedbacksMap };
  }

  async getFeedbackBusinessByDate(
    auth: AuthRequestDto,
    req: IdRequestDto,
    startDate: Date,
    endDate: Date,
  ): Promise<FeedbackBusinessDto> {
    const feedbacks = await this.feedbackBusinessModel
      .find({
        _id: req.id,
        sentAt: { $gte: startDate, $lte: endDate },
      })
      .select('UserId Message CreatedAt')
      .exec();

    const feedbacksMap = feedbacks.map((feedback) => ({
      UserId: feedback.UserId?.toString(),
      Message: feedback.Message,
      CreatedAt: feedback.CreatedAt,
    }));

    return { items: feedbacksMap };
  }

  async getAllApplicationFeedBack(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    auth: AuthRequestDto,
  ): Promise<FeedbackApplicationDto> {
    const feedbacks = await this.feedbackApplicationModel
      .find()
      .select('UserId Message CreatedAt')
      .exec();

    const feedbacksMap = feedbacks.map((feedback) => ({
      UserId: feedback.UserId?.toString(),
      Message: feedback.Message,
      CreatedAt: feedback.CreatedAt,
    }));

    return { items: feedbacksMap };
  }

  async getApplicationFeedbackByDate(
    auth: AuthRequestDto,
    startDate: Date,
    endDate: Date,
  ): Promise<FeedbackApplicationDto> {
    const feedbacks = await this.feedbackApplicationModel
      .find({
        sentAt: { $gte: startDate, $lte: endDate },
      })
      .select('UserId Message CreatedAt')
      .exec();

    const feedbacksMap = feedbacks.map((feedback) => ({
      UserId: feedback.UserId?.toString(),
      Message: feedback.Message,
      CreatedAt: feedback.CreatedAt,
    }));

    return { items: feedbacksMap };
  }
}
