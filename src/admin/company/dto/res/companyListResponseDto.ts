import { ApiProperty } from '@nestjs/swagger';
import { MusicCategoryEnum } from '../../../../enum/musicCategory.enum';
import { CompanyConceptEnum } from '../../../../enum/companyConcept.enum';

export class ListCompanyResponse {
  @ApiProperty()
  CompanyId: string;
  @ApiProperty()
  CompanyName: string;
  @ApiProperty()
  CompanyOwnerId: string;
  @ApiProperty()
  CompanyOwnerFullName: string;
  @ApiProperty()
  Address: string;
  @ApiProperty()
  MusicCategory: MusicCategoryEnum[];
  @ApiProperty()
  Concept: CompanyConceptEnum[];
  @ApiProperty()
  SpotifyEmail: string;
  @ApiProperty()
  IsActive: boolean;
  @ApiProperty()
  IsApproved: boolean;
  @ApiProperty()
  CreatedAt: Date;

  constructor(
    CompanyId: string,
    CompanyName: string,
    CompanyOwnerFullName: string,
    Address: string,
    MusicCategory: MusicCategoryEnum[],
    Concept: CompanyConceptEnum[],
    IsActive: boolean,
    IsApproved: boolean,
    CreatedAt: Date,
  ) {
    this.CompanyId = CompanyId;
    this.CompanyName = CompanyName;
    this.CompanyOwnerFullName = CompanyOwnerFullName;
    this.Address = Address;
    this.MusicCategory = MusicCategory;
    this.Concept = Concept;
    this.IsApproved = IsApproved;
    this.IsActive = IsActive;
    this.CreatedAt = CreatedAt;
  }
}

export class CompanyListResponseDto {
  @ApiProperty({ type: () => [ListCompanyResponse] })
  items: ListCompanyResponse[];
}
