import CardGameHeader from "components/card-game-header/card-game-header";
import TestCard from "components/test-card/test-card";
import { GameTypes, Word, WordResult } from "consts";
import { useAuth } from "contexts/auth";
import { useGameResults } from "contexts/result";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

const TestGame:FC = function() {
  const { token } = useAuth();

  const { wordRelation, id } = useParams();

  const { setResults } = useGameResults();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: `${wordRelation}_${id}_words`,
    queryFn: () => {
      return client("games/test", {
        method: "GET",
        token,
        headers: {
          [`${wordRelation}`]: id
        }
      })
    },
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 3
  });

  const [ activeWord, setActiveWord ] = useState<Word>();
  const [ answers, setAnswers ] = useState<WordResult[]>([]);
  const [ words, setWords ] = useState<Word[]>([]);
  console.log(data);
  

  useEffect(() => {
    if (words.length) {
      setActiveWord(words[0]);
    }
  }, [words]);

  const currentCardIndex = words.findIndex((word: Word) => word.id === activeWord?.id);
  const currentCard = words.find((word: Word) => word.id === activeWord?.id);
  
  const handleAnswerCheck = (isTrue : boolean) => {
    if (currentCard) {
      setAnswers([
        ...answers.slice(0, currentCardIndex),
        {
          ...currentCard,
          isTrue,
          seconds: 12
        },
        ...answers.slice(currentCardIndex + 1)
      ]);

      if (currentCardIndex === words.length - 1) {
        setResults([
          ...answers,
          {
            ...currentCard,
            isTrue,
            seconds: 12
          },
        ]);
      } else {
        setActiveWord(words[currentCardIndex + 1]);
      }
  
    }
  }

  return (
    <>
      <CardGameHeader backUrl={`/${wordRelation}/${id}`} type={GameTypes.Test} />
      <TestCard />
    </>
  );
}

export default TestGame;