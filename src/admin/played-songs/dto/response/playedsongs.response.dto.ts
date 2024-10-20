import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayedSongsResponse {
  @ApiProperty({
    description: 'Cover image',
    example: 'cover1.jpg',
  })
  @IsString()
  coverImage: string;

  @ApiProperty({
    description: 'Music title',
    example: 'Song A',
  })
  @IsString()
  musicName: string;

  @ApiProperty({
    description: 'Artist name',
    example: 'Artist 1',
  })
  @IsString()
  artistName: string;

  @ApiProperty({
    description: 'Date played',
    example: '2024-10-19T10:00:00',
  })
  @IsDate()
  playedAt: Date;
}

export class PlayedSongsResponseDto {
  @ApiProperty({ type: () => [PlayedSongsResponse] })
  items: PlayedSongsResponse[];
}
