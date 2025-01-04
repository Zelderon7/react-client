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
  name: string; // Maps to public string Name
  imageUrl: string | null;
  isPublic: boolean; // Maps to public bool IsPublic
  institutionId: number; // Maps to public int InstitutionId
  institutionDTO?: IInstitutionDTO; // Nullable reference type InstitutionDTO
}

export interface IFullClassDTO {
  imageUrl: string | null;
  isPublic: boolean; // Maps to public bool IsPublic
  institutionId: number; // Maps to public int InstitutionId
  institutionDTO?: IInstitutionDTO; // Nullable reference type InstitutionDTO
  title: string;
  description: string;
  sections: { sectionTitle: string; sectionContent: string }[];
}
