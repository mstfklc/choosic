import { CompanyConceptEnum } from '../../../../enum/companyConcept.enum';
import { MusicCategoryEnum } from '../../../../enum/musicCategory.enum';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyRequestDto {
  @ApiProperty({
    example: '60b0a4e1e3c8d3b3d0a4b4a7',
    description: 'CompanyOwnerId',
  })
  @IsNotEmpty()
  @IsString()
  CompanyOwnerId: string;
  @ApiProperty({
    example: 'Company Name',
    description: 'Company Name',
  })
  @IsNotEmpty()
  @IsString()
  Name: string;
  @ApiProperty({
    example: 'Description',
    description: 'Description',
  })
  @IsNotEmpty()
  @IsString()
  Description: string;
  @ApiProperty({
    example: CompanyConceptEnum.Bar,
    description: 'Company Concept',
    enum: CompanyConceptEnum,
  })
  @IsNotEmpty()
  Concept: CompanyConceptEnum[];
  @ApiProperty({
    example: MusicCategoryEnum.Pop,
    description: 'MusicCategoryEnum List',
    enum: MusicCategoryEnum,
  })
  @IsNotEmpty()
  MusicCategory: MusicCategoryEnum[];
  @ApiProperty({
    example: 'Address',
    description: 'Address',
  })
  @IsNotEmpty()
  @IsString()
  Address: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Monday Work Time',
  })
  @IsNotEmpty()
  @IsString()
  MondayWorkTime: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Tuesday Work Time',
  })
  @IsNotEmpty()
  @IsString()
  TuesdayWorkTime: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Wednesday Work Time',
  })
  @IsNotEmpty()
  @IsString()
  WednesdayWorkTime: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Thursday Work Time',
  })
  @IsNotEmpty()
  @IsString()
  ThursdayWorkTime: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Friday Work Time',
  })
  @IsNotEmpty()
  @IsString()
  FridayWorkTime: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Saturday Work Time',
  })
  @IsNotEmpty()
  @IsString()
  SaturdayWorkTime: string;
  @ApiProperty({
    example: '09:00-18:00',
    description: 'Sunday Work Time',
  })
  @IsNotEmpty()
  @IsString()
  SundayWorkTime: string;
}
