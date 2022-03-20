import { WordResult } from "consts";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface GameResultType {
  results: WordResult[] | null;
  setResults:  React.Dispatch<React.SetStateAction<WordResult[] | null>>
}

const GameResultContext = createContext<GameResultType | null>(null);

const GameResultsProvider:FC = function(params: any) {
  const [ results, setResults ] = useState<WordResult[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (results) {
      navigate("/finish");
    }
  }, [results, navigate]);

  return (
    <GameResultContext.Provider value={{results, setResults}} {...params} />
  );
}

export default GameResultsProvider;

export const useGameResults = function() {
  const values = useContext(GameResultContext);

  if (!values) {
    throw Error("useGameResults cannot be used outside GameResultsProvider");
  }

  return values;
}