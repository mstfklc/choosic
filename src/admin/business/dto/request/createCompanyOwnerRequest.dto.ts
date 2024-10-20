import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyOwnerRequestDto {
  @ApiProperty({
    description: 'Name of the company owner',
    example: 'John',
  })
  @IsEmail()
  @IsNotEmpty()
  Email: string;
  @ApiProperty({
    description: 'Password of the company owner',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  Password: string;
}
