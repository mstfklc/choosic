import { MaxLength } from 'class-validator';

export class RefreshTokenDTO {
  @MaxLength(2000)
  refresh_token: string;
}
