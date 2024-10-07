import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedbackApplication } from '../../../schemas/feedback-application.schema';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('application-feedback')
@ApiTags('feedback')
export class ApplicationFeedbackController {
  private feedbackService: any;

  @Get()
  @ApiOkResponse({ type: [FeedbackApplication] })
  async getAllFeedback(): Promise<FeedbackApplication[]> {
    return this.feedbackService.getAllFeedBack();
  }

  @Post('by-version')
  @ApiOkResponse({ type: [FeedbackApplication] })
  async getFeedbackByVersion(
    @Body('version') version: string,
  ): Promise<FeedbackApplication[]> {
    return this.feedbackService.getFeedbackByVersion(version);
  }

  @Post('by-date')
  @ApiOkResponse({ type: [FeedbackApplication] })
  async getFeedbackByDate(
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate?: Date,
  ): Promise<FeedbackApplication[]> {
    const end = endDate || new Date();
    return this.feedbackService.getFeedbackByDate(startDate, end);
  }
}
