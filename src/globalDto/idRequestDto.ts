import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdRequestDto {
  @ApiProperty({
    description: 'ID',
    example: '5f7a1f8b0b4b3b001f9f5b9d',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
