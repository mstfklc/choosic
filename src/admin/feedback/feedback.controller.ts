import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackBusinessDto } from './dto/feedback.business.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { FeedbackService } from './feedback.service';
import { FeedbackApplicationDto } from './dto/feedback.application.dto';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/application')
  @ApiOkResponse({ type: [FeedbackApplicationDto] })
  async getAllApplicationFeedBack(): Promise<FeedbackApplicationDto[]> {
    return this.feedbackService.getAllApplicationFeedBack();
  }

  @Post('/application/by-date')
  @ApiOkResponse({ type: [FeedbackApplicationDto] })
  async getApplicationFeedbackByDate(
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate?: Date,
  ): Promise<FeedbackApplicationDto[]> {
    const end = endDate || new Date();
    return this.feedbackService.getApplicationFeedbackByDate(startDate, end);
  }

  @Post('/business')
  @ApiOkResponse({ type: [FeedbackBusinessDto] })
  async getFeedbackBusiness(
    @Body() idRequestDto: IdRequestDto,
  ): Promise<FeedbackBusinessDto[]> {
    return this.feedbackService.getFeedBackBusiness(idRequestDto);
  }

  @Post('/business/by-date')
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
