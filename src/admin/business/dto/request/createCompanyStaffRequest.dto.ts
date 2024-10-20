import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyStaffRequestDto {
  @ApiProperty({
    example: 'company-id',
    description: 'Id of the company',
  })
  @IsString()
  @IsNotEmpty()
  CompanyId: string;
  @ApiProperty({
    example: 'username',
    description: 'Username for the staff',
  })
  @IsString()
  @IsNotEmpty()
  Username: string;

  @ApiProperty({
    example: 'password',
    description: 'Password for the staff',
  })
  @IsString()
  @IsNotEmpty()
  Password: string;
}
