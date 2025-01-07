import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import ClassesCarousel from "../../components/homepage/ClassesCarousel";
import { IClassVM, IChallengeVM } from "../../../interfaces/VM.ts";
import { getRecent, getChallenges } from "../../utils/asp/classes.ts";
import ThemeSwitch from "../../components/general/ThemeSwitch.tsx";
import ChallengesList from "../../components/homepage/ChallengesList.tsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState<IClassVM[]>([]);
  const [challenges, setChallenges] = useState<IChallengeVM[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true); // State for loading status
  const [loadingChallenges, setLoadingChallenges] = useState(true); // State for loading status

  useEffect(() => {
    if (
      !localStorage.getItem("authToken") ||
      localStorage.getItem("authToken")!.length == 0
    ) {
      navigate("/login");
      return;
    }

    // Fetch data from an API
    const fetchClasses = async () => {
      setLoadingClasses(true); // Start loading
      const data = await getRecent();
      if (typeof data != "string") {
        console.log("setting classes");
        console.log(data as IClassVM[]);
        setClasses(data as IClassVM[]);
      } else {
        setClasses([]);
      }
      setLoadingClasses(false);
    };

    const fetchChallenges = async () => {
      setLoadingChallenges(true);
      console.log("Requesting chllenges");
      const data = await getChallenges();
      setChallenges(data as IChallengeVM[]);
      console.log(data as IChallengeVM[]);
      setLoadingChallenges(false);
    };

    fetchClasses();
    fetchChallenges();
  }, []); // Empty dependency array to run only once after component mounts

  return (
    <>
      <Navbar />
      <div className="flex-row mx-8 my-3 mt-8 align-start justify-middle space-y-6">
        <div>
          <h3 className="text-3xl font-sans font-bold text-textPrimary select-none">
            Dashboard
          </h3>
          <h5 className="text-sm text-textSecondary mb-4 select-none">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
            rerum provident expedita laboriosam quas omnis consectetur, laborum
            non reprehenderit excepturi mollitia? Hic, architecto earum ipsa
            pariatur officiis magnam odit autem?
          </h5>
        </div>

        <ClassesCarousel items={classes} title={"Recent Classes"} />

        <ChallengesList items={challenges} />
      </div>
    </>
  );
}
