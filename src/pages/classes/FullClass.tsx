import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ClassNavbar from "./ClassNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { IClassSectionVM, IFullClass } from "../../../interfaces/VM";
import { getFullClass, removeSection } from "../../utils/asp/classes";
import AddSection from "../../components/class/AddSection";
import ConfirmationBox from "../../components/general/ConfirmationBox";

const defaultClassData: IFullClass = {
  image: "",
  title: "",
  description: "",
  sections: [],
};

export default function FullClass() {
  const { classId } = useParams<{ classId: string }>();
  const [fullClass, setFullClass] = useState<IFullClass>(defaultClassData);
  const [
    isDeleateSectionConfirmationVisible,
    setIsDeleateSectionConfirmationVisible,
  ] = useState(false);
  const [sectionToBeDeleted, setSectionToBeDeleted] = useState<number>(-1);
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");

  useEffect(() => {
    if (!classId) {
      navigate("/"); // Navigate to home if classId is missing
      return;
    }

    getFullClass(Number(classId)).then((fc) => {
      if (typeof fc === typeof "string") {
        console.log(fc);
        navigate("/");
      }

      setFullClass(fc as IFullClass);
    });
  }, [classId]);

  function handleOnSectionChange(sections: IClassSectionVM[]): void {
    setFullClass((prevClass) => ({
      ...prevClass,
      sections: sections,
    }));
  }

  function handleDeleateSection(): void {
    if (sectionToBeDeleted == -1) return;
    removeSection(sectionToBeDeleted, classId!).then((remainingSections) => {
      handleOnSectionChange(remainingSections);
      setSectionToBeDeleted(-1);
      setIsDeleateSectionConfirmationVisible(false);
    });
  }

  return (
    <>
      <Navbar title={fullClass.title} />
      <ClassNavbar />

      {fullClass.title.length === 0 ? (
        <>
          {/** Spinner until the classData is fetched */}
          <div>Loading...</div>
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-start">
          <p className="text-xl font-thin">{fullClass?.description}</p>
          <div className="bg-secondary rounded-xl w-full p-2 flex items-center justify-center gap-2">
            {fullClass.sections && fullClass.sections.length > 0 ? (
              <div className="flex flex-col w-full gap-2">
                {fullClass.sections.map((s, i) => (
                  <div
                    key={i}
                    className="bg-slate-600 rounded-md p-1 w-full flex items-center justify-center"
                  >
                    <p>{s.title}</p>
                    <button
                      className="text-red-600 ml-2"
                      onClick={() => {
                        setSectionToBeDeleted(s.sectionId);
                        setIsDeleateSectionConfirmationVisible(true);
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h5>No sections yet!</h5>
              </>
            )}
          </div>
          {role == "TEACHER" || role == "ADMIN" ? (
            <AddSection
              classId={classId!}
              onSectionAdd={handleOnSectionChange}
            />
          ) : (
            <></>
          )}
        </div>
      )}

      <ConfirmationBox
        title="Are you sure you want to deleate this section?"
        onContinue={handleDeleateSection}
        onCancel={() => {
          setSectionToBeDeleted(-1);
          setIsDeleateSectionConfirmationVisible(false);
        }}
        isVisible={isDeleateSectionConfirmationVisible}
      />
    </>
  );
}
