import { registerAs } from '@nestjs/config';

export const TokenConfigName = 'token';

export interface TokenConfig {
  accessTokenValidity: number;
  refreshTokenValidity: number;
}

export default registerAs(TokenConfigName, () => ({
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
}));
