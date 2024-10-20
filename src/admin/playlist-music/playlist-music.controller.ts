import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlist-music')
@ApiTags('admin/playlist-music')
export class PlaylistMusicController {}
