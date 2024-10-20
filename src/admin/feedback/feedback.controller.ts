import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackBusinessDto } from './dto/feedback.business.dto';
import { IdRequestDto } from '../../globalDto/idRequestDto';
import { FeedbackService } from './feedback.service';
import { FeedbackApplicationDto } from './dto/feedback.application.dto';
import { AuthRequestDto } from '../../custom/jwt/dto/auth.request.dto';

@ApiTags('admin/feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/application')
  @ApiOkResponse({ type: FeedbackApplicationDto })
  async getAllApplicationFeedBack(
    @Req() auth: AuthRequestDto,
  ): Promise<FeedbackApplicationDto> {
    return this.feedbackService.getAllApplicationFeedBack(auth);
  }

  @Post('/application/by-date')
  @ApiOkResponse({ type: FeedbackApplicationDto })
  async getApplicationFeedbackByDate(
    @Req() auth: AuthRequestDto,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate?: Date,
  ): Promise<FeedbackApplicationDto> {
    const end = endDate || new Date();
    return this.feedbackService.getApplicationFeedbackByDate(
      auth,
      startDate,
      end,
    );
  }

  @Post('/business')
  @ApiOkResponse({ type: FeedbackBusinessDto })
  async getFeedbackBusiness(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
  ): Promise<FeedbackBusinessDto> {
    return this.feedbackService.getFeedBackBusiness(auth, req);
  }

  @Post('/business/by-date')
  @ApiOkResponse({ type: FeedbackBusinessDto })
  async getFeedbackBusinessByDate(
    @Req() auth: AuthRequestDto,
    @Body() req: IdRequestDto,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate?: Date,
  ): Promise<FeedbackBusinessDto> {
    const end = endDate || new Date();
    return this.feedbackService.getFeedbackBusinessByDate(
      auth,
      req,
      startDate,
      end,
    );
  }
}
