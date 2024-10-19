import { Injectable } from '@nestjs/common';
import { FeedbackBusiness } from '../../../schemas/feedbackBusiness.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { FeedbackBusinessDto } from '../dto/feedback.business.dto';

@Injectable()
export class BusinessFeedbackService {
  constructor(
    @InjectModel(FeedbackBusiness.name)
    private readonly feedbackBusinessModel: Model<FeedbackBusiness>,
  ) {}

  async getFeedBackBusiness(
    idRequestDto: IdRequestDto,
  ): Promise<FeedbackBusinessDto[]> {
    const feedbacks = await this.feedbackBusinessModel
      .find({ _id: idRequestDto.id })
      .select('UserId Message CreatedAt')
      .exec();

    return feedbacks.map((feedback) => ({
      UserId: feedback.UserId?.toString(),
      Message: feedback.Message,
      CreatedAt: feedback.CreatedAt,
    }));
  }

  async getFeedbackBusinessByDate(
    idRequestDto: IdRequestDto,
    startDate: Date,
    endDate: Date,
  ): Promise<FeedbackBusinessDto[]> {
    const feedbacks = await this.feedbackBusinessModel
      .find({
        _id: idRequestDto.id,
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
