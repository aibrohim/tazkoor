import AuthSubmit from "components/auth/submit/submit";
import Field from "components/field/field";
import FormModal from "components/form-modal/form-modal";
import { useAuth } from "contexts/auth";
import { Dispatch, FC, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { client } from "utils/client";

interface Props {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>
}

const JoinBookModal:FC<Props> = function({open, setOpen}) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [ id, setId ] = useState<string>("");

  const { 
    isLoading,
    mutateAsync,
  } = useMutation(() => client(`books/join`, {
    token: user?.token,
    data: {
      book_id: id
    }
  })); 

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    mutateAsync().then(() => queryClient.refetchQueries("joined-books"));
  }

  const handleModalClose = () => setOpen(false);

  const handleInputChange = (evt: any) => setId(evt.target.value);

  return (
    <FormModal title="Join book" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. " onClose={handleModalClose} opened={open}>
      <form onSubmit={handleFormSubmit} className="join-book-modal">
        <Field value={id} onChange={handleInputChange} type="number" label="Book id" />

        <AuthSubmit disabled={isLoading} className="join-book-submit">{isLoading ? "Joining..." : "Join"}</AuthSubmit>
      </form>
    </FormModal>
  );
}

export default JoinBookModal;