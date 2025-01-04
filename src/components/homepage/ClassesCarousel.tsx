import React, { useState, ReactNode } from "react";
import { Class } from "./Class";
import { IClassVM } from "../../../interfaces/VM";

interface CarouselProps {
  items: IClassVM[]; // Array of React components or nodes
  title?: string;
}

const ClassesCarousel: React.FC<CarouselProps> = ({ items, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : items.length - 4
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < items.length - 4 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="bg-secondary w-full flex flex-col items-start justify-start border-border border-2 rounded-md p-2 pt-5 pb-3">
      {title && title.length > 0 ? (
        <h3 className="text-xl font-sans font-bold ml-3">{title}</h3>
      ) : (
        <></>
      )}
      <div className="w-full flex flex-row items-center justify-center min-h-12 mt-3">
        {items.length > 0 ? (
          <>
            {/* Left Arrow */}
            <div className="flex-none mr-auto items-center my-2">
              <button
                onClick={handlePrev}
                className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
              >
                Prev
              </button>
            </div>

            {/*<h2>Classes</h2>*/}
            <div className="mx-auto">
              <div
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {items.map((item, index) => (
                  /*<div
                    key={index}
                    className="w-1/4 h-[200px] flex-shrink-0" // Replace 200px with your desired height
                  >*/
                  <Class key={index} classData={item}></Class>
                  /*</div>*/
                ))}
              </div>
            </div>

            {/* Right Arrow */}

            <div className="flex-none ml-auto items-center my-2">
              <button
                onClick={handleNext}
                className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <h2 className="text-slate-400 font-bold">No Data</h2>
        )}
      </div>
    </div>
  );
};

export default ClassesCarousel;
