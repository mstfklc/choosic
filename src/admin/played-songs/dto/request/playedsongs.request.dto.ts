import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayedSongsRequestDto {
  @ApiProperty({
    description: 'Company ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({
    description: 'Start date in ISO format (YYYY-MM-DDTHH:mm:ss)',
    example: '2024-01-01T12:00:00',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date in ISO format (YYYY-MM-DDTHH:mm:ss)',
    example: '2024-12-31T23:59:59',
  })
  @IsDateString()
  endDate: string;
}
