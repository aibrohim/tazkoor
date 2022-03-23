import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FixedAddBtn from "components/fixed-add-btn/fixed-add-btn";
import FormModal from "components/form-modal/form-modal";
import { Language, Weights, WordRelationType } from "consts";
import { useAuth } from "contexts/auth";
import { FC, FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

import "./add-word.scss";

interface Props {
  type: WordRelationType;
  bookId?: number;
  language_native: Language;
  language_translate: Language;
  onWordAdded: Function
}

const AddWord:FC<Props> = function({type, language_native, language_translate, onWordAdded, bookId}) {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false);

  console.log(bookId);
  
  const { token } = useAuth();

  const { id } = useParams();
  const [ title, setTitle ] = useState<string>("");
  const [ titleTranslate, setTitleTranslate ] = useState<string>("");

  const { 
    isLoading,
    mutate,
    isSuccess,
    reset,
    data
  } = useMutation(() => client(`words`, {
    token,
    data: {
      book: bookId,
      [type === WordRelationType.Book ? "book" : "theme"]: id,
      title,
      title_translate: titleTranslate,
      partsofspeech: 1
    }
  }));

  useEffect(() => {
    if (isSuccess && data.ok && isModalOpen) {
      onWordAdded(data.word);

      setModalOpen(false);

      setTitle("");
      setTitleTranslate("");

      reset();
    }
  }, [isSuccess, data, onWordAdded, isModalOpen, reset]);

  const handleFormSubmit = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (title.trim().length && title.trim().length) {
      mutate();
    }
  }

  const handleModalClose = () => setModalOpen(false);

  const handleAddBtnClick = () => setModalOpen(true);

  return (
    <>
      <FixedAddBtn onClick={handleAddBtnClick} weight={Weights.medium} addText="word" />

      {isModalOpen && (
        <FormModal
          opened={isModalOpen}
          onClose={handleModalClose}
          title="So'z qo'shish"
          description="Whether a medieval typesetter chose to garble a well-known"
        >
          <form onSubmit={handleFormSubmit} className="add-word" action="#">
            <AuthFields>
              <AuthField value={title} onChange={(e:any) => setTitle(e.target.value)} label={language_native.title} type="text" />
              <AuthField value={titleTranslate} onChange={(e:any) => setTitleTranslate(e.target.value)} label={language_translate.title} type="text" />
            </AuthFields>

            <AuthSubmit disabled={isLoading} className="add-word__submit">
              {isLoading ? "So'z qo'shilyapti..." : "So'z qo'shish"}
            </AuthSubmit>
          </form>
        </FormModal>
      )}
    </>
  );
}

export default AddWord;