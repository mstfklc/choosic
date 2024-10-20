import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CompanyStaffInfoDto {
  @IsString()
  id: string;

  @ApiProperty({ description: 'The username of the company staff' })
  @IsEmail()
  Username: string;

  @ApiProperty({ description: 'The password of the company staff' })
  @IsNotEmpty()
  @IsString()
  PasswordHashed: string;
}
