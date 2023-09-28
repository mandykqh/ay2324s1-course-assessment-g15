import { createContext } from "react";
import { QuestionString, emptyQuestionString } from "../commons";

interface ContextProps {
  questionCache: QuestionString,
  setQuestionCache: (newData: QuestionString) => void
}

export const QuestionCacheContext = createContext<ContextProps>({
  questionCache: emptyQuestionString,
  setQuestionCache: () => { }
});
