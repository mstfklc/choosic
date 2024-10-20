import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'User name',
    example: 'testSuperAdmin',
    required: true,
  })
  @IsString()
  Username: string;
  @ApiProperty({
    description: 'User email address',
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  Email: string;
  @ApiProperty({
    description: 'User password',
    example: 'testSuperAdmin',
    required: true,
  })
  @IsString()
  Password: string;
  @ApiProperty({
    description: 'User name',
    example: 'Batu',
    required: true,
  })
  @IsString()
  Name: string;
  @ApiProperty({
    description: 'User surname',
    example: 'Kaya',
    required: true,
  })
  @IsString()
  Surname: string;
  @ApiProperty({
    description: 'Phone number of the super index',
    example: '+905321234567',
    required: true,
    type: String,
  })
  @Length(13, 13)
  Phone: string;
  @ApiProperty({
    description: 'User agreement acceptance',
    example: 'true',
    required: true,
  })
  AgreementAcceptance: boolean;
}
