import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FormModal from "components/form-modal/form-modal";
import { Weights } from "consts";
import { useAuth } from "contexts/auth";
import { Dispatch, FC, FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

import "./edit-theme.scss";

interface Props {
  title: string;
  isOpen: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const EditTheme:FC<Props> = function({title: defaultTitle, isOpen, setOpen}) {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const [ isEditOpen, setEditOpen ] = useState<boolean>(isOpen);

  useEffect(() => {
    setEditOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setOpen(isEditOpen);
  }, [isEditOpen, setOpen]);

  const { id } = useParams();

  const [ title, setTitle ] = useState<string>(defaultTitle);

  const { 
    isLoading,
    mutateAsync,
  } = useMutation(() => client(`themes`, {
    token: user?.token,
    method: "PUT",
    data: {
      id,
      title
    }
  }));  

  const handleFormSubmit = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    if (title.trim()) {
      mutateAsync().then(() => queryClient.refetchQueries("theme_" + id).then(() => setEditOpen(false)));
    }
  }

  const handleInputChange = (evt:any) => setTitle(evt.target.value);

  const handleEditModalClose = function() {
    setEditOpen(false);
  }

  return (
    <FormModal
      title="Edit theme"
      description="Whether a medieval typesetter chose to garble a well-known"
      opened={isEditOpen}
      onClose={handleEditModalClose}
    >
      <form onSubmit={handleFormSubmit} className="add-theme" method="POST">
        <AuthFields className="add-theme__fields">
          <AuthField label="Mavzu nomi" value={title} onChange={handleInputChange} />
        </AuthFields>

        <AuthSubmit disabled={isLoading} weight={Weights.bold} className="add-theme__submit">
          {isLoading ? "Editing..." : "Edit"}
        </AuthSubmit>
      </form>
    </FormModal>
  );
}

export default EditTheme;