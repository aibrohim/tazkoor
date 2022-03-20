import BigSpinner from "components/big-spinner/big-spinner";
import CardBody from "components/card-body/card-body";
import CardGameHeader from "components/card-game-header/card-game-header";
import { GameTypes, Word } from "consts";
import { useAuth } from "contexts/auth";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

interface Answer {
  id: number;
  answer: boolean;
}

function shuffleWords(array: Word[]) {
  const inner = array.slice();
  for (let i = inner.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [inner[i], inner[j]] = [inner[j], inner[i]];
  }

  return inner;
}

const CardGame = function() {
  const { token } = useAuth();

  const { wordRelation, id } = useParams();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: `${wordRelation}_${id}_words`,
    queryFn: () => {
      return client("words", {
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
  const [ answers, setAnswers ] = useState<Answer[]>([]);
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
          id: currentCard.id,
          answer: isTrue
        },
        ...answers.slice(currentCardIndex + 1)
      ]);
  
      setActiveWord(words[currentCardIndex + 1]);
    }
  }


  return (
    <>
      <CardGameHeader backUrl={`/${wordRelation}/${id}`} type={GameTypes.Card} />

      <main>
        {isLoading && <BigSpinner />}
        {data && <CardBody key={currentCard?.id} onAnswerCheck={handleAnswerCheck} order={currentCardIndex + 1} length={data.words.length} wordData={activeWord} />}
      </main>
    </>
  )
};

export default CardGame;