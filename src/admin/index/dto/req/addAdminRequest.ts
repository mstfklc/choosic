import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class AddAdminRequest {
  @ApiProperty({
    description: 'User name of the super index',
    example: 'testSuperAdmin',
    required: true,
    type: String,
  })
  userName: string;
  @ApiProperty({
    description: 'Password of the super index',
    example: 'testSuperAdmin',
    required: true,
    type: String,
  })
  password: string;
  @ApiProperty({
    description: 'First name of the super index',
    example: 'erkağğn',
    required: true,
    type: String,
  })
  name: string;
  @ApiProperty({
    description: 'Last name of the super index',
    example: 'celllooo',
    required: true,
    type: String,
  })
  surname: string;
  @ApiProperty({
    description: 'Email of the super index',
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Phone number of the super index',
    example: '+905321234567',
    required: true,
    type: String,
  })
  @Length(13, 13)
  phone: string;
}
