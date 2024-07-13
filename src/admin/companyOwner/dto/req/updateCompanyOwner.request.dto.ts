import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateCompanyOwnerRequestDto {
  @ApiProperty({
    description: 'Company owner id',
    example: '60f4b3b3b3b3b3b3b3b3b3b3',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty({
    description: 'User name',
    example: 'testAdmin',
    type: String,
  })
  @IsString()
  @IsOptional()
  username?: string;
  @ApiProperty({
    description: 'User email address',
    example: 'test@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsOptional()
  email?: string;
  @ApiProperty({
    description: 'User name',
    example: 'Batu',
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string;
  @ApiProperty({
    description: 'User surname',
    example: 'Kaya',
    type: String,
  })
  @IsOptional()
  @IsString()
  surname?: string;
  @ApiProperty({
    description: 'Phone number of the super index',
    example: '+905321234567',
    type: String,
  })
  @IsOptional()
  @Length(13, 13)
  phone?: string;
}
