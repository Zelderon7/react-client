import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ClassNavbar from "./ClassNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { IFullClass } from "../../../interfaces/VM";
import { getFullClass } from "../../utils/asp/classes";

const defaultClassData: IFullClass = {
  image: "",
  title: "",
  description: "",
  sections: [],
};

export default function FullClass() {
  const { classId } = useParams<{ classId: string }>();
  const [fullClass, setFullClass] = useState<IFullClass>(defaultClassData);
  const navigate = useNavigate();

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
              <>
                {fullClass.sections.map((s, i) => (
                  <div key={i} className="bg-slate-600 rounded-md p-1 w-full">
                    <p>{s.sectionTitle}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h5>No sections yet!</h5>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
