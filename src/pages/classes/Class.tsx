import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ClassNavbar from "./ClassNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { IFullClass } from "../../../interfaces/VM";
import { getFullClass } from "../../utils/asp/classes";

export default function Class() {
  const { classId } = useParams<{ classId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    getFullClass(Number(classId)).then((fc) => {
      if (typeof fc === typeof "string") {
        console.log(fc);
        navigate("/");
      }

      setFullClass(fc as IFullClass);
    });
  }, [classId, navigate]);

  const [fullClass, setFullClass] = useState<IFullClass>();

  return (
    <>
      <Navbar />
      <ClassNavbar />

      <div className="w-full flex flex-col justify-center items-start">
        <p className="text-3xl font-thin">{fullClass?.title}</p>
        <p className="text-xl font-thin">{fullClass?.description}</p>
        <img src={fullClass?.image}></img>
        <div className="bg-secondary rounded-xl w-full p-2 flex items-center justify-center gap-2">
          {fullClass?.sections.map((s, i) => (
            <div key={i} className="bg-slate-600 rounded-md p-1 w-full">
              <p>{s.sectionTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
