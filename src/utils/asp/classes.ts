import { title } from "process";
import {
  IClassDTO,
  IFullClassDTO,
  IClassSectionDTO,
} from "../../../interfaces/DTO";
import {
  IClassVM,
  IChallengeVM,
  IFullClass,
  IClassSectionVM,
} from "../../../interfaces/VM";
import {
  FullClassDTOToFullClassVM,
  IClassDTOToIClassVM,
  IClassSectionDTOToVM,
} from "../DTO/typeConversions";
import { CHALLENGES_GRADIENT_COLORS } from "../../constants";

export async function getRecent(): Promise<string | IClassVM[]> {
  const url = `https://localhost:7017/api/class/get-my-classes`; // Use REACT_APP prefix for environment variables in React

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`, // Use `getItem` to safely access localStorage
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as IClassDTO[]; // Ensure it's cast as an array of IClassDTO

    console.log(data);

    // Transform each IClassDTO to IClassVM
    const convertedData = data.map((item) => IClassDTOToIClassVM(item));

    console.log(convertedData);

    return convertedData;
  } catch (error) {
    console.error("Error fetching recent classes:", error);
    return `Error: ${error}`; // Return a meaningful error string
  }
}

export async function getChallenges(): Promise<string | IChallengeVM[]> {
  try {
    // Simulate fetching data (e.g., from an API or database)
    const response: IChallengeVM[] = [
      {
        title: "Challenge 1",
        description:
          "This is **bold**, this is *italic*.\n\nHere is a new line.\n\nHere is a new line.\n\nHere is a new line.\n\nHere is a new line.\n\nHere is a new line.\n\nHere is a new line.\n\nHere is a new line.\n\nHere is a new line.\n\nHere is a new line.",
        difficulty: 3,
      },
      {
        title: "Challenge 2",
        description: "This is a description of challenge 2.",
        difficulty: 5,
      },
      {
        title: "Challenge 3",
        description: "This is a description of challenge 3.",
        difficulty: 1,
      },
      {
        title: "Challenge 4",
        description: "This is a description of challenge 3.",
        difficulty: 6,
      },
    ];

    response.forEach((element) => {
      element.gradientFrom = CHALLENGES_GRADIENT_COLORS[element.difficulty][0];
      element.gradientVia = CHALLENGES_GRADIENT_COLORS[element.difficulty][1];
      element.gradientTo = CHALLENGES_GRADIENT_COLORS[element.difficulty][2];
    });

    // Simulate delay (e.g., waiting for an API response)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return the challenges array
    return response;
  } catch (error) {
    // Handle any errors and return an error message
    return "Failed to fetch challenges.";
  }
}

export async function getFullClass(
  classId: number
): Promise<IFullClass | string> {
  const url = `https://localhost:7017/api/class/get-full?classId=${classId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`, // Use `getItem` to safely access localStorage
      },
      credentials: "include",
    });

    if (!response.ok) return response.status.toString();

    const classData = (await response.json()) as IFullClassDTO;

    return FullClassDTOToFullClassVM(classData);
  } catch (error) {
    return "Failed to fetch";
  }
}

export async function addSection(
  sectionName: string,
  classId: string
): Promise<IClassSectionVM[]> {
  const url = `https://localhost:7017/api/class/add-section`;

  // Construct query parameters
  const queryString = new URLSearchParams([
    ["name", sectionName],
    ["classId", classId],
  ]).toString();
  const fullUrl = `${url}?${queryString}`;

  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No token!");

  // Fetch options
  const options: RequestInit = {
    method: "POST", // or 'GET', 'PUT', 'DELETE', etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Bearer token for authorization
    },
  };

  const response = await fetch(fullUrl, options);

  if (!response.ok) throw new Error("unknown error");

  const result = (await response.json()) as IClassSectionDTO[];
  return result.map((x) => IClassSectionDTOToVM(x));
}

export async function removeSection(
  sectionId: number,
  classId: string
): Promise<IClassSectionVM[]> {
  const url = `https://localhost:7017/api/class/remove-section`;

  // Construct query parameters
  const queryString = new URLSearchParams([
    ["classId", classId],
    ["sectionId", sectionId.toString()],
  ]).toString();
  const fullUrl = `${url}?${queryString}`;

  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No token!");

  // Fetch options
  const options: RequestInit = {
    method: "DELETE", // or 'GET', 'PUT', 'DELETE', etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Bearer token for authorization
    },
  };

  const response = await fetch(fullUrl, options);

  if (!response.ok) throw new Error("unknown error");

  const result = (await response.json()) as IClassSectionDTO[];
  return result.map((x) => IClassSectionDTOToVM(x));
}
