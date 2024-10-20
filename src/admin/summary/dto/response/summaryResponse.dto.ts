import { ApiProperty } from '@nestjs/swagger';

export class SummaryResponseDto {
  @ApiProperty({
    example: 100,
    description: 'Total played songs',
  })
  totalPlayedSongs: number;
  @ApiProperty({
    example: 10000,
    description: 'Total earning price',
  })
  totalEarningPrice: number;
  @ApiProperty({
    example: 20000,
    description: 'Total users',
  })
  totalUserCount: number;
  @ApiProperty({
    example: 150,
    description: 'Total companies',
  })
  totalCompanyCount: number;
}
