export interface IClassVM {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface IFullClass {
  image: string | null;
  title: string;
  description: string;
  sections: { sectionTitle: string; sectionId: number }[];
}

export interface IClassSection {
  title: string;
  description: string;
  //...
}

export interface IChallengeVM {
  title: string;
  description: string;
  difficulty: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

export interface IQuestionVM {
  id: number;
  title: string;
  description: string | null;
  type: string;
  answers: any; //Type depends of the type of the question
  points: number;
  additionalData: any; //In case some question type requres additional data
}
