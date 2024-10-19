import { Injectable } from '@nestjs/common';
import { FeedbackBusiness } from '../../../schemas/feedbackBusiness.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdRequestDto } from '../../../globalDto/idRequestDto';

@Injectable()
export class BusinessFeedbackService {
  constructor(
    @InjectModel(FeedbackBusiness.name)
    private readonly feedbackBusinessModel: Model<FeedbackBusiness>,
  ) {}

  async getFeedBackBusiness(
    idRequestDto: IdRequestDto,
  ): Promise<FeedbackBusiness[]> {
    return this.feedbackBusinessModel.find({ _id: idRequestDto.id }).exec();
  }

  async getFeedbackBusinessByDate(
    idRequestDto: IdRequestDto,
    startDate: Date,
    endDate: Date,
  ): Promise<FeedbackBusiness[]> {
    return this.feedbackBusinessModel
      .find({
        sentAt: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }
}
