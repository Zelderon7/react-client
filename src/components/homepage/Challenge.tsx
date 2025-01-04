import React from "react";
import ReactMarkdown from "react-markdown";
import { IChallengeVM } from "../../../interfaces/VM";

export interface ChallengeProps {
  data: IChallengeVM;
  gradientFrom?: string;
  gradientVia?: string | null;
  gradientTo?: string;
}

const Challenge: React.FC<ChallengeProps> = ({
  data,
  gradientFrom = "purple-400",
  gradientVia,
  gradientTo = "pink-500",
}) => {
  const gradientClasses = `bg-gradient-to-r from-${gradientFrom} ${
    gradientVia ? `via-${gradientVia}` : ""
  } to-${gradientTo}`;

  return (
    <div
      className={`p-1 ${gradientClasses.trim()} rounded-lg bg-clip-border w-full cursor-pointer`}
      onClick={() => alert("Click")}
    >
      <div className="bg-primary flex flex-col items-start justify-start rounded-lg p-3 py-5 w-full">
        <h2 className="text-lg mb-1">{data.title}</h2>
        <div className="overflow-y-auto max-h-20 w-full scrollbar-custom">
          <ReactMarkdown>{data.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
