import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FixedAddBtn from "components/fixed-add-btn/fixed-add-btn";
import FormModal from "components/form-modal/form-modal";
import { Weights } from "consts";
import { useAuth } from "contexts/auth";
import { FC, FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

import "./add-theme.scss";

interface Props {
  onThemeAdded: Function
}

const AddTheme:FC<Props> = function({onThemeAdded}) {
  const { user } = useAuth();
  const [ isAddOpen, setAddOpen ] = useState<boolean>(false);

  const { id } = useParams();

  const [ title, setTitle ] = useState<string>("");

  const { 
    isLoading,
    mutateAsync,
    isSuccess,
    data
  } = useMutation(() => client(`themes`, {
    token: user?.token,
    data: {
      book_id: id,
      title
    }
  }));  

  useEffect(() => {
    if (isSuccess && data && isAddOpen) {
      console.log(data);
      
      onThemeAdded({...data.data[0], words_count: 0});

      setAddOpen(false);
    }
  }, [isSuccess, data, isAddOpen, onThemeAdded]);

  const handleFormSubmit = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (title.trim().length) {
      mutateAsync();
    }
  }

  const handleInputChange = (evt:any) => setTitle(evt.target.value);

  const handleAddClick = function() {
    setAddOpen(true);
  }

  const handleAddModalClose = function() {
    setAddOpen(false);
  }

  return (
    <>
      <FixedAddBtn onClick={handleAddClick} weight={Weights.medium} addText="theme" />

      <FormModal
        title="Add theme"
        description="Whether a medieval typesetter chose to garble a well-known"
        opened={isAddOpen}
        onClose={handleAddModalClose}
      >
        <form onSubmit={handleFormSubmit} className="add-theme" method="POST">
          <AuthFields className="add-theme__fields">
            <AuthField label="Mavzu nomi" value={title} onChange={handleInputChange} />
          </AuthFields>

          <AuthSubmit disabled={isLoading} weight={Weights.bold} className="add-theme__submit">
            {isLoading ? "Mavzu qo'shilyapti..." : "Mavzu qo'shish"}
          </AuthSubmit>
        </form>
      </FormModal>
    </>
  );
}

export default AddTheme;