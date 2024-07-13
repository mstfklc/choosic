import { ApiProperty } from '@nestjs/swagger';

export class AdminListResponse {
  @ApiProperty()
  userId: string;

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
  isActive: boolean;

  constructor(
    userId: string,
    userName: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    isActive: boolean,
  ) {
    this.userId = userId;
    this.userName = userName;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.isActive = isActive;
  }
}

export class AdminListResponseItem {
  @ApiProperty({ type: () => [AdminListResponse] })
  items: AdminListResponse[];
}
