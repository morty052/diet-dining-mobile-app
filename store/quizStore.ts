import { create } from "zustand";

interface IquizStore {
  dietObject: {
    mealPreference: "NONE" | "PESCATARIAN" | "VEGAN" | "VEGETARIAN";
    allergies: string[];
    budget: number;
  };
  answers: string[];
  plan: string;
  setAnswer: (answer: string) => void;
  setAllergy: (answer: string) => void;
  setMealPreference: (
    answer: "NONE" | "PESCATARIAN" | "VEGAN" | "VEGETARIAN"
  ) => void;
  resetAnswers: () => void;
  setPlan: (plan: string) => void;
}

const dietObject = {
  mealPreference: "NONE",
  allergies: [],
  budget: 0,
};

export const useQuizStore = create<IquizStore>((set) => ({
  dietObject: {
    mealPreference: "NONE",
    allergies: [],
    budget: 0,
  },
  answers: [],
  plan: "",
  setAnswer: (answer) => {
    console.log(answer);
    set((state) => ({ answers: [...state.answers, answer] }));
  },
  setAllergy: (allergy) => {
    console.log(allergy);
    set((state) => ({
      dietObject: {
        ...state.dietObject,
        allergies: [...state.dietObject.allergies, allergy],
      },
    }));
    console.log(dietObject);
  },
  setMealPreference: (pref) => {
    console.log(pref);
    set((state) => ({
      dietObject: {
        ...state.dietObject,
        mealPreference: pref,
      },
    }));
    console.log(dietObject);
  },
  resetAnswers: () => set((state) => ({ answers: [] })),
  setPlan: (plan: string) => set((state) => ({ plan })),
}));
