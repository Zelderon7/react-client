import { IClassDTO } from "../../../interfaces/DTO";
import { IClassVM } from "../../../interfaces/VM";

export const IClassDTOToIClassVM = (classDTO: IClassDTO): IClassVM => {
  return {
    image: classDTO.imageUrl ?? "",
    title: classDTO.name,
    description: classDTO.isPublic
      ? `Public class offered by ${
          classDTO.institutionDTO?.name ?? "an institution"
        }`
      : "This is a private class.",
  };
};
