import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AddCompanyOwnerRequestDto {
  @ApiProperty({
    description: 'User name',
    example: 'testAdmin',
    required: true,
  })
  @IsString()
  username: string;
  @ApiProperty({
    description: 'User email address',
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'User password',
    example: 'testAdmin',
    required: true,
  })
  @IsString()
  password: string;
  @ApiProperty({
    description: 'User name',
    example: 'Batu',
    required: true,
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'User surname',
    example: 'Kaya',
    required: true,
  })
  @IsString()
  surname: string;
  @ApiProperty({
    description: 'Phone number of the super index',
    example: '+905321234567',
    required: true,
    type: String,
  })
  @Length(13, 13)
  phone: string;
}
