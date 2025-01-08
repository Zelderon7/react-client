import React, { useState } from "react";
import { addSection } from "../../utils/asp/classes";
import { IClassSectionVM } from "../../../interfaces/VM";

interface addSectionProps {
  classId: string;
  onSectionAdd?: (sections: IClassSectionVM[]) => void;
}

export default function AddSection({
  classId,
  onSectionAdd = () => {},
}: addSectionProps) {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [sectionName, setSectionName] = useState<string>("");

  const handleButtonClick = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSectionName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sectionName.trim()) {
      console.log("Section added:", sectionName);
      await addSection(sectionName, classId)
        .then((x) => onSectionAdd(x))
        .catch(() => alert("error"));

      setSectionName(""); // Clear the input field after submission
      setFormVisible(false); // Optionally hide the form after submission
    }
  };

  return (
    <div className="p-2 border-border border-2 rounded-md">
      <button onClick={handleButtonClick}>Add Section</button>
      {!isFormVisible ? (
        <></>
      ) : (
        <form onSubmit={handleSubmit} className="p-3 pl-0">
          <input
            type="text"
            value={sectionName}
            onChange={handleInputChange}
            placeholder="Type section name"
          />
          <button type="submit" className="ml-2 p-2 bg-[#008CBA] rounded-lg">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
