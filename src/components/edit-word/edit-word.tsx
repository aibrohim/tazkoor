import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import Button from "components/button/button";
import FormModal from "components/form-modal/form-modal";
import { Weights, Word, WordRelationType } from "consts";
import { useAuth } from "contexts/auth";
import { Dispatch, FC, FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  const { id: typeId } = useParams();
  const { token } = useAuth();

  const [ title, setTitle ] = useState<string>("");
  const [ title_translate, setTitleTranslate ] = useState<string>("");

  const { mutateAsync, isLoading } = useMutation(() => client(`words`, {
    token,
    method: "PUT",
    data: {
      id: editingWord?.id,
      title,
      title_translate: title_translate,
      partsofspeech: 1
    }
  }));

  const { mutateAsync : deleteAsync, isLoading : isDeleting } = useMutation(() => client(`words`, {
    token,
    method: "DELETE",
    data: {
      id: editingWord?.id,
    }
  }));

  useEffect(() => {
    setOpen(Boolean(editingWord));
    
    setTitle(editingWord ? editingWord.title : "");
    setTitleTranslate(editingWord ? editingWord.title_translate : "");
  }, [editingWord]);

  const handleModalClose = function() {
    setEditingWord(null);
  }

  if (!editingWord) {
    return null;
  }

  const handleTitleChange = (e : any) => setTitle(e.target.value);
  const handleTranslateChange = (e : any) => setTitleTranslate(e.target.value);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    if (
      (title.trim() && title.trim().toLowerCase() !== editingWord.title.toLowerCase())
      ||
      (title_translate.trim() && title_translate.trim().toLowerCase() !== editingWord.title_translate.toLowerCase())
    ) {
      mutateAsync().then(() => queryClient.refetchQueries(`${type}_${typeId}_words`).then(() => setEditingWord(null)));
    }
  }

  const handleDeleteClick = () => deleteAsync().then(() => queryClient.refetchQueries(`${type}_${typeId}_words`).then(() => setEditingWord(null)));

  return (
    <FormModal
      onClose={handleModalClose}
      opened={isOpen}
      description="Whether a medieval typesetter chose to garble a well-known"
      title="Edit word"
    >
      <form onSubmit={handleFormSubmit} className="edit-word" action="#">
          <AuthFields>
            <AuthField value={title} onChange={handleTitleChange} label="O'zbek" type="text" />
            <AuthField value={title_translate} onChange={handleTranslateChange} label="English" type="text" />
          </AuthFields>

          <AuthSubmit disabled={isLoading} weight={Weights.semiBold} className="edit-word__submit">
            {isLoading ? "Editing word..." : "Edit word"}
          </AuthSubmit>

          <Button onClick={handleDeleteClick} disabled={isDeleting} type="button" className="edit-word__delete" weight={Weights.semiBold}>{isDeleting ? "Deleting" : "Delete"}</Button>
        </form>
    </FormModal>
  );
};

export default EditWord;