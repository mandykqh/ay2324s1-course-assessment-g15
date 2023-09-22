import { createContext } from "react";
import { QuestionString, questionStringTemplate } from "../Commons";

interface ContextProps {
  questionData: QuestionString,
  setQuestionData: (newData: QuestionString) => void
}

export const NewQuestionContext = createContext<ContextProps>({
  questionData: questionStringTemplate,
  setQuestionData: () => { }
});
