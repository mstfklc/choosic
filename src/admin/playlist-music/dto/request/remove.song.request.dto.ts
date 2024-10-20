import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RemoveSongsRequestDTO {
  @ApiProperty({
    description: 'Company ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({
    description: 'Playlist ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  playlistId: string;

  @ApiProperty({
    description: 'song name',
    example: 'song',
  })
  @IsString()
  @IsNotEmpty()
  songName: string;
}
