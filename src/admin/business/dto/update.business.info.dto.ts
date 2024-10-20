import { ApiProperty } from '@nestjs/swagger';
import { CompanyConceptEnum } from '../../../enum/companyConcept.enum';
import { MusicCategoryEnum } from '../../../enum/musicCategory.enum';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateBusinessInfoDto {
  @ApiProperty({
    required: false,
    example: 'A trendy cafe with a modern vibe.',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  Description?: string;

  @ApiProperty({
    type: [String],
    required: false,
    example: ['path/to/image1.jpg', 'path/to/image2.jpg'],
  })
  @IsOptional()
  @IsArray({ message: 'CompanyImagePath must be an array.' })
  @IsString({
    each: true,
    message: 'Each item in CompanyImagePath must be a string.',
  })
  CompanyImagePath?: string[];

  @ApiProperty({
    required: false,
    example: '123 Main St, Any town, USA',
  })
  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  Address?: string;

  @ApiProperty({
    type: [String],
    enum: CompanyConceptEnum,
    required: false,
    example: [CompanyConceptEnum.Bar, CompanyConceptEnum.Pub],
  })
  @IsOptional()
  @IsEnum(CompanyConceptEnum, {
    each: true,
    message: 'Each item in CompanyConcept must be a valid enum value.',
  })
  CompanyConcept?: CompanyConceptEnum[];

  @ApiProperty({
    type: [String],
    enum: MusicCategoryEnum,
    required: false,
    example: [MusicCategoryEnum.Jazz, MusicCategoryEnum.Rock],
  })
  @IsOptional()
  @IsEnum(MusicCategoryEnum, {
    each: true,
    message: 'Each item in MusicCategory must be a valid enum value.',
  })
  MusicCategory?: MusicCategoryEnum[];

  @ApiProperty({
    required: false,
    example: '08:00 - 18:00',
  })
  @IsOptional()
  @IsString({ message: 'MondayWorkTime must be a string.' })
  MondayWorkTime?: string;

  @ApiProperty({
    required: false,
    example: '08:00 - 18:00',
  })
  @IsOptional()
  @IsString({ message: 'TuesdayWorkTime must be a string.' })
  TuesdayWorkTime?: string;

  @ApiProperty({
    required: false,
    example: '08:00 - 18:00',
  })
  @IsOptional()
  @IsString({ message: 'WednesdayWorkTime must be a string.' })
  WednesdayWorkTime?: string;

  @ApiProperty({
    required: false,
    example: '08:00 - 18:00',
  })
  @IsOptional()
  @IsString({ message: 'ThursWorkTime must be a string.' })
  ThursWorkTime?: string;

  @ApiProperty({
    required: false,
    example: '08:00 - 18:00',
  })
  @IsOptional()
  @IsString({ message: 'FridayWorkTime must be a string.' })
  FridayWorkTime?: string;

  @ApiProperty({
    required: false,
    example: '08:00 - 18:00',
  })
  @IsOptional()
  @IsString({ message: 'SaturdayWorkTime must be a string.' })
  SaturdayWorkTime?: string;

  @ApiProperty({
    required: false,
    example: '08:00 - 18:00',
  })
  @IsOptional()
  @IsString({ message: 'SundayWorkTime must be a string.' })
  SundayWorkTime?: string;
}
