import { ApiProperty } from '@nestjs/swagger';
import { CompanyConceptEnum } from '../../../../enum/companyConcept.enum';
import { MusicCategoryEnum } from '../../../../enum/musicCategory.enum';

export class CompanyDetailResponseDto {
  @ApiProperty()
  CompanyId: string;
  @ApiProperty()
  CompanyName: string;
  @ApiProperty()
  CompanyOwnerId: string;
  @ApiProperty()
  CompanyOwnerFullName: string;
  @ApiProperty()
  Description: string;
  @ApiProperty()
  MusicCategory: MusicCategoryEnum[];
  @ApiProperty()
  Concept: CompanyConceptEnum[];
  @ApiProperty()
  SpotifyEmail: string;
  @ApiProperty()
  MidWeekWorkTime: string;
  @ApiProperty()
  SaturdayWorkTime: string;
  @ApiProperty()
  SundayWorkTime: string;
  @ApiProperty()
  Latitude: string;
  @ApiProperty()
  Longitude: string;
  @ApiProperty()
  IsActive: boolean;
  @ApiProperty()
  IsApproved: boolean;
  @ApiProperty()
  CreatedAt: Date;
}
