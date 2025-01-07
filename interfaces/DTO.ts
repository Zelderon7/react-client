import { IClassSectionVM } from "./VM";

export interface IInstitutionDTO {
  name: string;
  address: string;
  contactEmail: string;
}

export interface IUserTokenDTO {
  username: string;
  email: string;
  role: string;
  token: string;
  icon: string;
}

export interface IClassDTO {
  id: number;
  name: string; // Maps to public string Name
  imageUrl: string | null;
  isPublic: boolean; // Maps to public bool IsPublic
  institutionId: number; // Maps to public int InstitutionId
  institutionDTO?: IInstitutionDTO; // Nullable reference type InstitutionDTO
}

export interface IClassSectionDTO {
  sectionTitle: string;
  sectionId: number;
}

export interface IFullClassDTO {
  id: number;
  imageUrl: string | null;
  name: string;
  description: string;
  isPublic: boolean;
  institutionId: number;
  classSections: IClassSectionDTO[];
}
