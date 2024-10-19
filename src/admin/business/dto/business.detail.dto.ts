import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class BusinessDetailDto {
  @ApiProperty({
    description: 'Company image url',
    example: 'http://path/images/companyimage.png',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  CompanyImagePath: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Company',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  CompanyName: string;

  @ApiProperty({
    description: 'Company account created date',
    example: '2019-02-01',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  CreatedDate: Date;
}
