import { createContext } from "react";
import { MatchingString, emptyMatchingString } from "../Commons";

interface ContextProps {
  matchingCache: MatchingString,
  setMatchingCache: (newData: MatchingString) => void
}

export const MatchingCacheContext = createContext<ContextProps>({
  matchingCache: emptyMatchingString,
  setMatchingCache: () => { }
});
