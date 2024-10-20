import { CompanyConceptEnum } from '../../../enum/companyConcept.enum';
import { MusicCategoryEnum } from '../../../enum/musicCategory.enum';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyRequestDto {
  @ApiProperty({
    description: 'ID of the company',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  Id: string;
  @ApiProperty({
    example: 'Company Name',
    description: 'Company Name',
  })
  @IsOptional()
  @IsString()
  Name?: string;
  @ApiProperty({
    example: 'Description',
    description: 'Description',
  })
  @IsOptional()
  @IsString()
  Description?: string;
  @ApiProperty({
    example: CompanyConceptEnum.Bar,
    description: 'Company Concept',
    enum: CompanyConceptEnum,
  })
  @IsOptional()
  Concept?: CompanyConceptEnum[];
  @ApiProperty({
    example: MusicCategoryEnum.Pop,
    description: 'MusicCategoryEnum List',
    enum: MusicCategoryEnum,
  })
  @IsOptional()
  MusicCategory?: MusicCategoryEnum[];
  @ApiProperty({
    example: 'Address',
    description: 'Address',
  })
  @IsOptional()
  @IsString()
  Address?: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Monday Work Time',
  })
  @IsOptional()
  @IsString()
  MondayWorkTime?: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Tuesday Work Time',
  })
  @IsOptional()
  @IsString()
  TuesdayWorkTime?: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Wednesday Work Time',
  })
  @IsOptional()
  @IsString()
  WednesdayWorkTime?: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Thursday Work Time',
  })
  @IsOptional()
  @IsString()
  ThursdayWorkTime?: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Friday Work Time',
  })
  @IsOptional()
  @IsString()
  FridayWorkTime?: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Saturday Work Time',
  })
  @IsOptional()
  @IsString()
  SaturdayWorkTime?: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Sunday Work Time',
  })
  @IsOptional()
  @IsString()
  SundayWorkTime?: string;
}
