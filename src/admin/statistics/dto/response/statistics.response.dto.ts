import { IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StatisticsResponseDto {
  @ApiProperty({
    description: 'Number of music plays',
    example: 150,
  })
  @IsNumber()
  musicPlayCount: number;

  @ApiProperty({
    description: 'Earnings',
    example: 5000,
  })
  @IsNumber()
  earnings: number;

  @ApiProperty({
    description: 'Number of business views',
    example: 300,
  })
  @IsNumber()
  views: number;

  @ApiProperty({ description: 'Date of the statistic' })
  @IsDate()
  date: Date;
}
