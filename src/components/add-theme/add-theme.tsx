import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FixedAddBtn from "components/fixed-add-btn/fixed-add-btn";
import FormModal from "components/form-modal/form-modal";
import { Weights } from "consts";
import { FC, useState } from "react";

import "./add-theme.scss";

const AddTheme:FC = function() {

  const [ isAddOpen, setAddOpen ] = useState<boolean>(false);

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
        <form className="add-theme" method="POST">
          <AuthFields className="add-theme__fields">
            <AuthField label="Mavzu nomi" />
          </AuthFields>

          <AuthSubmit weight={Weights.bold} className="add-theme__submit">
            Mavzu qo'shish
          </AuthSubmit>
        </form>
      </FormModal>
    </>
  );
}

export default AddTheme;