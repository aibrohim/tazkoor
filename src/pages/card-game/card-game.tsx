import CardBody from "components/card-body/card-body";
import CardGameHeader from "components/card-game-header/card-game-header";
import CardSkeleton from "components/loaders/card-skeleton/card-skeleton";
import { GameTypes, Word, WordResult } from "consts";
import { useAuth } from "contexts/auth";
import { useGameResults } from "contexts/result";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

function shuffleWords(array: Word[]) {
  const inner = array.slice();
  for (let i = inner.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [inner[i], inner[j]] = [inner[j], inner[i]];
  }

  return inner;
}

const CardGame = function() {
  const { user } = useAuth();

  const { wordRelation, id } = useParams();

  const { setResults } = useGameResults();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryFn: () => {
      return client("words", {
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

  const [ activeWord, setActiveWord ] = useState<Word>();
  const [ answers, setAnswers ] = useState<WordResult[]>([]);
  const [ words, setWords ] = useState<Word[]>([]);

  useEffect(() => {
    if (data) {
      setWords(shuffleWords(data.words));
    }
  }, [data]);

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
      <CardGameHeader backUrl={`/${wordRelation}/${id}`} type={GameTypes.Card} />

      <main>
        {isLoading && !data && <CardSkeleton />}
        {data && <CardBody key={currentCard?.id} onAnswerCheck={handleAnswerCheck} order={currentCardIndex + 1} length={data.words.length} wordData={activeWord} />}
      </main>
    </>
  )
};

export default CardGame;

