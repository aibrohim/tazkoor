import CardGameHeader from "components/card-game-header/card-game-header";
import TestSkeleton from "components/loaders/test-skeleton/test-skeleton";
import TestCard from "components/test-card/test-card";
import { GameTypes, TestWord, WordResult } from "consts";
import { useAuth } from "contexts/auth";
import { useGameResults } from "contexts/result";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

const TestGame:FC = function() {
  const { user } = useAuth();

  const { wordRelation, id } = useParams();

  const { setResults } = useGameResults();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryFn: () => {
      return client("games/test", {
        method: "GET",
        token: user?.token,
        headers: {
          [`${wordRelation}`]: id
        }
      })
    },
    enabled: true,
    keepPreviousData: false,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    retry: 3
  });

  const [ activeWord, setActiveWord ] = useState<TestWord | null>(null);
  const [ answers, setAnswers ] = useState<WordResult[]>([]);


  useEffect(() => {
    if (data) { 
      setActiveWord(data.data[0]);
    }
  }, [data]);

  const index = data ? data.data.findIndex((word: TestWord) => word.id === activeWord?.id) : null;

  const handleWordAnswered = (answer: WordResult) => {
    setAnswers([
      ...answers,
      answer
    ]);
    setActiveWord(data.data[index + 1]);

    if (index === data.data.length - 1) {
      setResults([...answers, answer]);
    }
  }

  return (
    <>
      <CardGameHeader backUrl={`/${wordRelation}/${id}`} type={GameTypes.Test} />
      {!activeWord && isLoading && <TestSkeleton />}
      {activeWord && <TestCard key={activeWord.id} onAnswered={handleWordAnswered} book={1} index={index + 1} length={data.data.length} word={activeWord} />}
    </>
  );
} 

export default TestGame;