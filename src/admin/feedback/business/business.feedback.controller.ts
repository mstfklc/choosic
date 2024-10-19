import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdRequestDto } from '../../../globalDto/idRequestDto';
import { BusinessFeedbackService } from './business.feedback.service';
import { FeedbackBusinessDto } from '../dto/feedback.business.dto';

@Controller('business')
@ApiTags('feedback')
export class BusinessFeedbackController {
  constructor(private readonly feedbackService: BusinessFeedbackService) {}

  @Post('get-feedback')
  @ApiOkResponse({ type: [FeedbackBusinessDto] })
  async getFeedbackBusiness(
    @Body() idRequestDto: IdRequestDto,
  ): Promise<FeedbackBusinessDto[]> {
    return this.feedbackService.getFeedBackBusiness(idRequestDto);
  }

  @Post('get-feedback-by-date')
  @ApiOkResponse({ type: [FeedbackBusinessDto] })
  async getFeedbackBusinessByDate(
    @Body() idRequestDto: IdRequestDto,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate?: Date,
  ): Promise<FeedbackBusinessDto[]> {
    const end = endDate || new Date();
    return this.feedbackService.getFeedbackBusinessByDate(
      idRequestDto,
      startDate,
      end,
    );
  }
}
