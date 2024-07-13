import { ApiProperty } from '@nestjs/swagger';

export class ShowCompanyPasswordResponseDto {
  @ApiProperty()
  password: string;
}
