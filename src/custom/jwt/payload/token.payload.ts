import { Types } from 'mongoose';

export class TokenPayload {
  readonly sub: Types.ObjectId;
  readonly iat: number;
  readonly exp: number;
  readonly prm: string;

  constructor(subject: Types.ObjectId, param: string, validity: number) {
    this.sub = subject;
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + validity;
    this.prm = param;
  }
}
