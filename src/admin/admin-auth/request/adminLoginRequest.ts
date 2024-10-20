import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginRequest {
  @ApiProperty({
    example: 'admin@choosicbox.com',
    description: 'Admin email',
    type: String,
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: 'password',
    description: 'Admin password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
