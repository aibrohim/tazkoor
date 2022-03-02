import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FormModal from "components/form-modal/form-modal";
import { Dispatch, FC, useEffect, useState } from "react";

import "./edit-word.scss";

interface Props {
  editingId: number | null;
  setEditingId: Dispatch<React.SetStateAction<number | null>>
}

const EditWord:FC<Props> = function({editingId, setEditingId}) {
  const [ isOpen, setOpen ] = useState<boolean>(false);

  useEffect(() => {
    setOpen(Boolean(editingId))
  }, [editingId]);

  const handleModalClose = function() {
    setEditingId(null);
  }

  return (
    <FormModal
      onClose={handleModalClose}
      opened={isOpen}
      description="Whether a medieval typesetter chose to garble a well-known"
      title="Edit word"
    >
      <form className="edit-word" action="#">
          <AuthFields>
            <AuthField label="O'zbek" type="text" />
            <AuthField label="English" type="text" />
            <AuthField label="So'z turkumi" type="select">
              <option value="0">Boshqa</option>
              <option value="1">Ot</option>
              <option value="2">Sifat</option>
              <option value="3">Fe'l</option>
            </AuthField>
          </AuthFields>

          <AuthSubmit className="edit-word__submit">So'z qo'shish</AuthSubmit>
        </form>
    </FormModal>
  );
};

export default EditWord;