import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.test',
  })
  accessToken: string;

  /* @ApiProperty({
     description: 'JWT Refresh Token',
     example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.test',
   })
   refreshToken: string;*/

  constructor(
    accessToken: string, // refreshToken: string
  ) {
    this.accessToken = accessToken;
    //this.refreshToken = refreshToken;
  }
}
