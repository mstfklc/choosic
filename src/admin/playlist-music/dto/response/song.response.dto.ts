import { ApiProperty } from '@nestjs/swagger';

export class SongsResponse {
  @ApiProperty({
    description: 'Cover image of the music',
    example: 'https://example.com/image.jpg',
  })
  coverImage: string;

  @ApiProperty({
    description: 'Name of the music',
    example: 'Song Title',
  })
  musicName: string;

  @ApiProperty({
    description: 'Name of the artist',
    example: 'Artist Name',
  })
  artistName: string;
}

export class SongsResponseDto {
  @ApiProperty({ type: [SongsResponse] })
  items: SongsResponse[];
}
