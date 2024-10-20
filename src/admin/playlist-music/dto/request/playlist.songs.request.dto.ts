import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PlaylistSongsRequestDTO {
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
}
