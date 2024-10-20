import { ApiProperty } from '@nestjs/swagger';

export class PlaylistSongsResponseDto {
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

  @ApiProperty({
    description: 'Date the music was added to the playlist',
    example: '2024-01-01T12:00:00',
  })
  addedAt: Date;
}
