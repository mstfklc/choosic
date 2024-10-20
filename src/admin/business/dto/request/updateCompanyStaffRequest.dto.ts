import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyStaffRequestDto {
  @ApiProperty({
    description: 'ID of the company',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  Id: string;
  @ApiProperty({
    example: 'username',
    description: 'Username for the staff',
  })
  @IsString()
  @IsOptional()
  Username?: string;
  @ApiProperty({
    example: 'password',
    description: 'Password for the staff',
  })
  @IsString()
  @IsOptional()
  Password?: string;
}
