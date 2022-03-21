import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FormModal from "components/form-modal/form-modal";
import { Word, WordRelationType } from "consts";
import { useAuth } from "contexts/auth";
import { Dispatch, FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

import "./edit-word.scss";

interface Props {
  editingWord: Word | null;
  setEditingWord: Dispatch<React.SetStateAction<Word | null>>;
  type: WordRelationType
}

const EditWord:FC<Props> = function({editingWord, setEditingWord, type}) {
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const { token } = useAuth();

  const { id } = useParams();

  const [ title, setTitle ] = useState<string>("");
  const [ title_translate, setTitleTranslate ] = useState<string>("");
  const [ partsofspeech, setPartsofspeech ] = useState<string>("");

  const { 
    isLoading,
    mutate,
    isSuccess,
    reset,
    data
  } = useMutation(() => client(`words`, {
    token,
    data: {
      [type === WordRelationType.Book ? "book" : "theme"]: id,
      title,
      title_translate: title_translate,
      partsofspeech: +partsofspeech
    }
  }));

  useEffect(() => {
    setOpen(Boolean(editingWord));
    
    setTitle(editingWord ? editingWord.title : "");
    setTitleTranslate(editingWord ? editingWord.title_translate : "");
    setPartsofspeech(editingWord ? String(editingWord.partsofspeech) : "");
  }, [editingWord]);

  const handleModalClose = function() {
    setEditingWord(null);
  }

  if (!editingWord) {
    return null;
  }

  const handleTitleChange = (e : any) => setTitle(e.target.value);
  const handleTranslateChange = (e : any) => setTitleTranslate(e.target.value);
  const handlePartChange = (e : any) => setPartsofspeech(e.target.value);

  return (
    <FormModal
      onClose={handleModalClose}
      opened={isOpen}
      description="Whether a medieval typesetter chose to garble a well-known"
      title="Edit word"
    >
      <form className="edit-word" action="#">
          <AuthFields>
            <AuthField value={title} onChange={handleTitleChange} label="O'zbek" type="text" />
            <AuthField value={title_translate} onChange={handleTranslateChange} label="English" type="text" />
            <AuthField value={partsofspeech} onChange={handlePartChange} label="So'z turkumi" type="select">
              <option value="1">Boshqa</option>
              <option value="2">Ot</option>
              <option value="3">Sifat</option>
              <option value="4">Fe'l</option>
            </AuthField>
          </AuthFields>

          <AuthSubmit className="edit-word__submit">So'z qo'shish</AuthSubmit>
        </form>
    </FormModal>
  );
};

export default EditWord;