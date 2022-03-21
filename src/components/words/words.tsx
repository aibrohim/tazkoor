import AddWord from "components/add-word/add-word";
import BigSpinner from "components/big-spinner/big-spinner";
import EditWord from "components/edit-word/edit-word";
import Title from "components/title/title";
import WordCard from "components/word-card/word-card";
import { Language, Word, WordRelationType } from "consts";
import { useAuth } from "contexts/auth";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

import "./words.scss";

interface Props {
  type: WordRelationType;
  languages: {
    language_native: Language;
    language_translate: Language;
  }
}

const Words:FC<Props> = function({ type, languages }) {
  const { id } = useParams();

  const { token } = useAuth();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: type === WordRelationType.Book ? "book_" + id + "_words" : "theme_" + id + "_words",
    queryFn: () => {
      return client("words", {
        method: "GET",
        token,
        headers: {
          [type === WordRelationType.Book ? "book" : "theme"]: id,
        }
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });

  const [ editingWord, setEditingWord ] = useState<Word | null>(null);

  const [ words, setWords ] = useState<Word[]>([]);

  useEffect(() => {
    if (data) {
      setWords(data.words);
    }
  }, [data]);

  const handleWordClick = function(evt: any) {
    const clickedWord = words.find((word : Word) => word.id === +evt.target.dataset.id);
    if (clickedWord) {
      setEditingWord(clickedWord);
    }
  }

  const handleWordAdded = (word:Word) => {
    setWords([
      word,
      ...words
    ]);
  }

  return (
    <section className="words">
      <div className="words__header">
        <Title className="words__heading">Words</Title>
      </div>

      <div className="words__list">
        {isLoading && <BigSpinner />}

        {(data && !words.length) && <p>Ko'rsatish uchun so'zlar yo'q</p>}
        
        {words.map(word => (
          <WordCard
            key={word.id}
            onClick={handleWordClick}
            id={word.id}
            nativeLanguage={word.title}
            translateLanguage={word.title_translate}
          />
        ))}
      </div>

      <AddWord {...languages} onWordAdded={handleWordAdded} type={type} />
      <EditWord type={type} editingWord={editingWord} setEditingWord={setEditingWord} /> 
    </section>
  );
};

export default Words;