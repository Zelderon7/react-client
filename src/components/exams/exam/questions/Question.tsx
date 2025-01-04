import React from "react";
import { IQuestionVM } from "../../../../../interfaces/VM";

export interface ComponentProps {
  data: IQuestionVM;
}

const Question: React.FC<ComponentProps> = ({ data }) => {
  return (
    <>
      <div className="flex flex-col justify-around items-start">
        <div className="w-full flex flex-col justify-center items-start rounded-xl bg-third">
          <p className="text-md font-bold">{data.title}</p>
          <p className="text-md font-thin">{data.description}</p>
        </div>
      </div>
    </>
  );
};

export default Question;
