import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CompanyOwnerInfoDto {
  @IsString()
  id: string;

  @ApiProperty({ description: 'The email of the company owner' })
  @IsEmail()
  Email: string;

  @ApiProperty({ description: 'The password of the company owner' })
  @IsNotEmpty()
  @IsString()
  Password: string;
}
