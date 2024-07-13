import { ApiProperty } from '@nestjs/swagger';

export class CompanyOwnerDetailListResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  createdAt: Date;
}
