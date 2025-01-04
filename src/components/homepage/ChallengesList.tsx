import React from "react";
import { IChallengeVM } from "../../../interfaces/VM";
import Challenge from "./Challenge";

export interface ChallengesListProps {
  items?: IChallengeVM[];
}

const ChallengesList: React.FC<ChallengesListProps> = ({ items }) => {
  return (
    <div className="bg-secondary w-full flex flex-col items-start justify-start border-border border-2 rounded-md p-3">
      <h3 className="text-xl font-sans font-bold ml-3 mt-2 mb-4">Challenges</h3>

      <div className="flex items-center justify-center mt-2 w-full">
        {items && items.length > 0 ? (
          <div className="space-y-3 mx-3 w-full">
            {items.map((item, index) => (
              <Challenge
                key={index}
                data={item}
                gradientFrom={item.gradientFrom}
                gradientVia={item.gradientVia}
                gradientTo={item.gradientTo}
              />
            ))}
          </div>
        ) : (
          <>
            <h2 className="text-slate-400 font-bold">No Data</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengesList;
