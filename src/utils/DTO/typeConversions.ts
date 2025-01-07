import {
  IClassDTO,
  IClassSectionDTO,
  IFullClassDTO,
} from "../../../interfaces/DTO";
import { IClassSectionVM, IClassVM, IFullClass } from "../../../interfaces/VM";

export const IClassDTOToIClassVM = (classDTO: IClassDTO): IClassVM => {
  return {
    id: classDTO.id,
    image: classDTO.imageUrl ?? "",
    title: classDTO.name,
    description: classDTO.isPublic
      ? `Public class offered by ${
          classDTO.institutionDTO?.name ?? "an institution"
        }`
      : "This is a private class.",
  };
};

export function FullClassDTOToFullClassVM(data: IFullClassDTO): IFullClass {
  return {
    image: data.imageUrl,
    title: data.name,
    description: data.description,
    sections: data.classSections.map((s) => IClassSectionDTOToVM(s)).flat(),
  };
}

export function IClassSectionDTOToVM(data: IClassSectionDTO): IClassSectionVM {
  return {
    title: data.sectionTitle,
    sectionId: data.sectionId,
  };
}
