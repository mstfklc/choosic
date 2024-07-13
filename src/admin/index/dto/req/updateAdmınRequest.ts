import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateAdminRequest {
  @ApiProperty({
    description: 'ID',
    example: '5f7a1f8b0b4b3b001f9f5b9d',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
  @ApiProperty({
    description: 'User name of the super index',
    example: 'testSuperAdmin',
    required: false,
    type: String,
  })
  userName?: string;
  @ApiProperty({
    description: 'First name of the super index',
    example: 'mikaaaail',
    required: false,
    type: String,
  })
  name?: string;
  @ApiProperty({
    description: 'Last name of the super index',
    example: 'güüllük',
    required: false,
    type: String,
  })
  surname?: string;
  @ApiProperty({
    description: 'Email of the super index',
    example: 'test@gmail.com',
    required: false,
  })
  @IsEmail()
  email?: string;
  @ApiProperty({
    description: 'Phone number of the super index',
    example: '+905321234567',
    required: false,
    type: String,
  })
  @Length(13, 13)
  @IsOptional()
  phone?: string;
  @ApiProperty()
  isActive?: boolean;
}
