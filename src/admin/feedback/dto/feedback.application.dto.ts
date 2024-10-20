import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackApplication {
  @ApiProperty({
    description: 'User id',
    required: false,
  })
  @IsMongoId()
  UserId?: string;

  @ApiProperty({
    description: 'Feedback message',
    example: 'The application is useful!',
  })
  @IsString()
  Message: string;

  @ApiProperty({
    description: 'Created date of Feedback message',
    type: Date,
  })
  @IsString()
  CreatedAt: Date;
}

export class FeedbackApplicationDto {
  @ApiProperty({ type: [FeedbackApplication] })
  items: FeedbackApplication[];
}
