import { ApiProperty } from '@nestjs/swagger';
import { CompanyConceptEnum } from '../../../enum/companyConcept.enum';
import { MusicCategoryEnum } from '../../../enum/musicCategory.enum';
import { IsArray, IsEnum, IsString } from 'class-validator';

export class BusinessInfoDto {
  @ApiProperty({
    required: true,
    example: 'A trendy cafe with a modern vibe.',
  })
  @IsString()
  Description: string;

  @ApiProperty({
    type: [String],
    required: true,
    example: ['path/to/image1.jpg', 'path/to/image2.jpg'],
  })
  @IsArray()
  @IsString({ each: true })
  CompanyImagePath: string[];

  @ApiProperty({
    required: true,
    example: '123 Main St, Any town, USA',
  })
  @IsString()
  Address: string;

  @ApiProperty({
    type: [String],
    enum: CompanyConceptEnum,
    required: true,
    example: [CompanyConceptEnum.Bar, CompanyConceptEnum.Pub],
  })
  @IsEnum(CompanyConceptEnum, { each: true })
  CompanyConcept: CompanyConceptEnum[];

  @ApiProperty({
    type: [String],
    enum: MusicCategoryEnum,
    required: true,
    example: [MusicCategoryEnum.Jazz, MusicCategoryEnum.Rock],
  })
  @IsEnum(MusicCategoryEnum, { each: true })
  MusicCategory: MusicCategoryEnum[];

  @ApiProperty({
    required: true,
    example: '08:00 - 18:00',
  })
  @IsString()
  MondayWorkTime: string;

  @ApiProperty({
    required: true,
    example: '08:00 - 18:00',
  })
  @IsString()
  TuesdayWorkTime: string;

  @ApiProperty({
    required: true,
    example: '08:00 - 18:00',
  })
  @IsString()
  WednesdayWorkTime: string;

  @ApiProperty({
    required: true,
    example: '08:00 - 18:00',
  })
  @IsString()
  ThursWorkTime: string;

  @ApiProperty({
    required: true,
    example: '08:00 - 18:00',
  })
  @IsString()
  FridayWorkTime: string;

  @ApiProperty({
    required: true,
    example: '08:00 - 18:00',
  })
  @IsString()
  SaturdayWorkTime: string;

  @ApiProperty({
    required: true,
    example: '08:00 - 18:00',
  })
  @IsString()
  SundayWorkTime: string;
}
