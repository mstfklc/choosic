import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackBusiness } from '../../../schemas/feedback-business.schema';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { BusinessFeedbackService } from './business-feedback.service';

@Controller('business')
@ApiTags('feedback')
export class BusinessFeedbackController {
  constructor(private readonly feedbackService: BusinessFeedbackService) {}

  @Post('get-feedback')
  @ApiOkResponse({ type: [FeedbackBusiness] })
  async getFeedbackBusiness(
    @Body() idRequestDto: IdRequestDto,
  ): Promise<FeedbackBusiness[]> {
    return this.feedbackService.getFeedBackBusiness(idRequestDto);
  }

  @Post('get-feedback-by-date')
  @ApiOkResponse({ type: [FeedbackBusiness] })
  async getFeedbackBusinessByDate(
    @Body() idRequestDto: IdRequestDto,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate?: Date,
  ): Promise<FeedbackBusiness[]> {
    const end = endDate || new Date();
    return this.feedbackService.getFeedbackBusinessByDate(
      idRequestDto,
      startDate,
      end,
    );
  }
}
