import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackBusinessDto {
  @ApiProperty({
    description: 'User id',
    required: false,
  })
  @IsMongoId()
  UserId?: string;

  @ApiProperty({
    description: 'Feedback message',
    example: 'The business offers excellent service!',
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
