import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyOwnerRequestDto {
  @ApiProperty({
    description: 'ID of the company owner',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  Id: string;
  @ApiProperty({
    description: 'Name of the company owner',
    example: 'John',
  })
  @IsEmail()
  @IsOptional()
  Email?: string;
  @ApiProperty({
    description: 'Password of the company owner',
    example: '123456',
  })
  @IsString()
  @IsOptional()
  Password?: string;
}
