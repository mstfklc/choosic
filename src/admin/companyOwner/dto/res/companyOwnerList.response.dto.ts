import { ApiProperty } from '@nestjs/swagger';

export class CompanyOwnerListResponse {
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

  constructor(
    id: string,
    userName: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.userName = userName;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.createdAt = createdAt;
  }
}

export class CompanyOwnerListResponseDto {
  @ApiProperty({ type: () => [CompanyOwnerListResponse] })
  items: CompanyOwnerListResponse[];
}
