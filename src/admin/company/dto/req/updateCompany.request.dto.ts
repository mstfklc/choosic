import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MusicCategoryEnum } from '../../../../enum/musicCategory.enum';
import { CompanyConceptEnum } from '../../../../enum/companyConcept.enum';

export class UpdateCompanyRequestDto {
  @ApiProperty({
    example: '60f0c9d9e0f0c9d9e0f0c9d9',
    description: 'Company ID',
    type: String,
  })
  @IsOptional()
  companyId: string;
  @ApiProperty({
    example: 'CompanyName',
    description: 'Company Name',
    type: String,
  })
  @IsOptional()
  companyName?: string;
  @ApiProperty({
    example: 'Description',
    description: 'Description',
    type: String,
  })
  @IsOptional()
  description?: string;
  @ApiProperty({
    example: 'MusicCategory',
    description: 'Music Category',
    enum: MusicCategoryEnum,
  })
  @IsOptional()
  @IsEnum(MusicCategoryEnum)
  musicCategory?: MusicCategoryEnum[];
  @ApiProperty({
    example: 'CompanyConcept',
    description: 'Company Concept',
    enum: CompanyConceptEnum,
  })
  @IsOptional()
  @IsEnum(CompanyConceptEnum)
  companyConcept?: CompanyConceptEnum[];
  @ApiProperty({
    example: 'MidWeekWorkTime',
    description: 'Mid Week Work Time',
    type: String,
  })
  @IsOptional()
  midWeekWorkTime?: string;
  @ApiProperty({
    example: 'SaturdayWorkTime',
    description: 'Saturday Work Time',
    type: String,
  })
  @IsOptional()
  saturdayWorkTime?: string;
  @ApiProperty({
    example: 'SundayWorkTime',
    description: 'Sunday Work Time',
    type: String,
  })
  @IsOptional()
  sundayWorkTime?: string;
  @ApiProperty({
    example: 'Latitude',
    description: 'Latitude',
    type: String,
  })
  @IsOptional()
  latitude?: string;
  @ApiProperty({
    example: 'Longitude',
    description: 'Longitude',
    type: String,
  })
  @IsOptional()
  longitude?: string;
  @ApiProperty({
    example: 'IsActive',
    description: 'Is Active',
    type: Boolean,
  })
  @IsOptional()
  isActive?: boolean;
  @ApiProperty({
    example: 'IsApproved',
    description: 'Is Approved',
    type: Boolean,
  })
  @IsOptional()
  isApproved?: boolean;
  @ApiProperty({
    description: 'Spotify email address',
    example: 'mstf@gmail.com',
    type: String,
  })
  @IsOptional()
  @IsString()
  spotifyEmail?: string;
  @ApiProperty({
    description: 'Spotify password',
    example: 'password',
    type: String,
  })
  @IsOptional()
  @IsString()
  spotifyPassword?: string;
}
