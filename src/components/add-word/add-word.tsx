import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FixedAddBtn from "components/fixed-add-btn/fixed-add-btn";
import FormModal from "components/form-modal/form-modal";
import { Weights, WordRelationType } from "consts";
import { useAuth } from "contexts/auth";
import { FC, FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

import "./add-word.scss";

interface Props {
  type: WordRelationType;
  onWordAdded: Function
}

const AddWord:FC<Props> = function({type, onWordAdded}) {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false);

  const { token } = useAuth();

  const { id } = useParams();
  const [ title, setTitle ] = useState<string>("");
  const [ titleTranslate, setTitleTranslate ] = useState<string>("");
  console.log(type === WordRelationType.Book ? "book" : "theme");

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
              <AuthField value={title} onChange={(e:any) => setTitle(e.target.value)} label="O'zbek" type="text" />
              <AuthField value={titleTranslate} onChange={(e:any) => setTitleTranslate(e.target.value)} label="English" type="text" />
              <AuthField label="So'z turkumi" type="select">
                <option value="0">Boshqa</option>
                <option value="1">Ot</option>
                <option value="2">Sifat</option>
                <option value="3">Fe'l</option>
              </AuthField>
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