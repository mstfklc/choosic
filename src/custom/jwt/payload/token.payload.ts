export class TokenPayload {
  readonly sub: string;
  readonly iat: number;
  readonly exp: number;
  readonly prm: string;

  constructor(subject: string, param: string, validity: number) {
    this.sub = subject;
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + validity;
    this.prm = param;
  }
}
