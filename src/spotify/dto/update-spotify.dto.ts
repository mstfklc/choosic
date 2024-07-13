import { PartialType } from '@nestjs/swagger';
import { CreateSpotifyDto } from './create-spotify.dto';

export class UpdateSpotifyDto extends PartialType(CreateSpotifyDto) {}
