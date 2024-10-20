import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminRegisterRequestDto {
  @ApiProperty({
    description: 'User name',
    example: 'admin',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  Username: string;

  @ApiProperty({
    description: 'User firstname',
    example: 'John',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  Name: string;

  @ApiProperty({
    description: 'User real lastname',
    example: 'Doe',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  Surname: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+905929050000',
    type: 'string',
    required: true,
  })
  @IsString()
  @Length(13, 13)
  Phone: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@mail.com',
    type: 'string',
    required: true,
  })
  @IsEmail()
  Email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
    type: 'string',
    required: true,
  })
  @IsStrongPassword()
  Password: string;
}
