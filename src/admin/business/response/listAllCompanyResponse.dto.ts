import { ApiProperty } from '@nestjs/swagger';

export class ListAllCompanyResponse {
  @ApiProperty({
    example: '1',
    description: 'The id of the company',
  })
  id: string;
  @ApiProperty({
    example: 'Company Name',
    description: 'The name of the company',
  })
  companyName: string;
  @ApiProperty({
    example: ['https://www.example.com/image.jpg'],
    description: 'The image path of the company',
  })
  companyImagePath: string[];
  @ApiProperty({
    example: ['Music Category', 'Music Category2'],
    description: 'The music category of the company',
  })
  musicCategory: string[];
  @ApiProperty({
    example: 'Company Created Date',
    description: 'The created date of the company',
  })
  createdAt: Date;
}

export class ListAllCompanyResponseDto {
  @ApiProperty({ type: () => [ListAllCompanyResponse] })
  items: ListAllCompanyResponse[];
}
