import AddWord from "components/add-word/add-word";
import EditWord from "components/edit-word/edit-word";
import Title from "components/title/title";
import WordCard from "components/word-card/word-card";
import { FC, useState } from "react";

import "./words.scss";

const Words:FC = function() {
  const [ editingWord, setEditingWord ] = useState<number | null>(null);

  const handleWordClick = function(evt: any) {
    setEditingWord(+evt.target.dataset.id)
  }

  return (
    <section className="words">
      <div className="words__header">
        <Title className="words__heading">Words</Title>
      </div>

      <div className="words__list">
        <WordCard onClick={handleWordClick} id={1} nativeLanguage="Apple" translateLanguage="Olma" />
        <WordCard onClick={handleWordClick} id={2} nativeLanguage="Apple" translateLanguage="Olma" />
        <WordCard onClick={handleWordClick} id={3} nativeLanguage="Apple" translateLanguage="Olma" />
        <WordCard onClick={handleWordClick} id={4} nativeLanguage="Apple" translateLanguage="Olma" />
        <WordCard onClick={handleWordClick} id={5} nativeLanguage="Apple" translateLanguage="Olma" />
        <WordCard onClick={handleWordClick} id={6} nativeLanguage="Apple" translateLanguage="Olma" />
      </div>

      <AddWord />
      <EditWord editingId={editingWord} setEditingId={setEditingWord} /> 
    </section>
  );
};

export default Words;