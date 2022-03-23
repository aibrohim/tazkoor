import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FormModal from "components/form-modal/form-modal";
import { Weights } from "consts";
import { useAuth } from "contexts/auth";
import { Dispatch, FC, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

import "./update-book.scss";

interface Props {
  title: string;
  language_native: number;
  language_translate: number;
  isOpened: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const UpdateBook:FC<Props> = function({title: defaultTitle, isOpened, setOpen, language_native, language_translate}) {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { user } = useAuth();

  const [ title, setTitle ] = useState<string>(defaultTitle);

  const { mutateAsync, isLoading } = useMutation(() => client(`books`, {
    token: user?.token,
    method: "PUT",
    data: {
      book_id: id,
      title: title,
      language_native,
      language_translate
    }
  }));
  
  const handleClose = () => setOpen(false);
  const handleTitleChange = (evt:any) => setTitle(evt.target.value);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    if (title.trim() && title.toLowerCase() !== defaultTitle.toLowerCase()) {
      mutateAsync().then(() => queryClient.refetchQueries("books").then(() => setOpen(false)));
    }
  }

  return (
    <FormModal title="Update book" description="Bu yerdan kitobni o'zgartirasiz" onClose={handleClose} opened={isOpened}>
      <form onSubmit={handleFormSubmit} className="update-book">
        <AuthFields className="update-book__fields">
          <AuthField value={title} onChange={handleTitleChange} label="Kitob nomi" />
        </AuthFields>

        <AuthSubmit disabled={isLoading} className="update-book__submit" weight={Weights.semiBold}>{isLoading ? "Updating" : "Update"}</AuthSubmit>
      </form>
    </FormModal>
  );
}

export default UpdateBook;