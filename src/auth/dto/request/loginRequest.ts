import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    description: 'UserName',
    example: 'testSuperAdmin',
    required: true,
  })
  username: string;
  @ApiProperty({
    description: 'Password',
    example: 'testSuperAdmin',
    required: true,
  })
  password: string;
}
