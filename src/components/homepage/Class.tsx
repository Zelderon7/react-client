import React from "react";
import { IClassVM } from "../../../interfaces/VM.ts";

export function Class({ classData }: { classData: IClassVM }) {
  return (
    <div className="m-1 rounded-md bg-class_bg p-4">
      <img
        src={
          classData.image && classData.image.length > 0
            ? classData.image
            : "https://via.placeholder.com/150"
        }
        alt={"Image not found"}
        className="max-w-40 max-h-3/4 rounded-md"
      />
      <p className="text-xl text-textPrimary font-bold mt-2">
        {classData.title}
      </p>
      <p className="text-base text-textSecondary mt-1">
        {classData.description}
      </p>
    </div>
  );
}
