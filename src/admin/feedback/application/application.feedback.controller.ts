import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackApplicationDto } from '../dto/feedback.application.dto';

@Controller('application-feedback')
@ApiTags('feedback')
export class ApplicationFeedbackController {
  private feedbackService: any;

  @Get()
  @ApiOkResponse({ type: [FeedbackApplicationDto] })
  async getAllFeedback(): Promise<FeedbackApplicationDto[]> {
    return this.feedbackService.getAllFeedBack();
  }

  @Post('by-date')
  @ApiOkResponse({ type: [FeedbackApplicationDto] })
  async getFeedbackByDate(
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate?: Date,
  ): Promise<FeedbackApplicationDto[]> {
    const end = endDate || new Date();
    return this.feedbackService.getFeedbackByDate(startDate, end);
  }
}
