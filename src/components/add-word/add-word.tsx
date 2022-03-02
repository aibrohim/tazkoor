import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FixedAddBtn from "components/fixed-add-btn/fixed-add-btn";
import FormModal from "components/form-modal/form-modal";
import { Weights } from "consts";
import { FC, useState } from "react";

import "./add-word.scss";

const AddWord:FC = function() {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false);

  const handleModalClose = () => setModalOpen(false);

  const handleAddBtnClick = () => setModalOpen(true);

  return (
    <>
      <FixedAddBtn onClick={handleAddBtnClick} weight={Weights.medium} addText="word" />

      <FormModal
        opened={isModalOpen}
        onClose={handleModalClose}
        title="So'z qo'shish"
        description="Whether a medieval typesetter chose to garble a well-known"
      >
        <form className="add-word" action="#">
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

          <AuthSubmit className="add-word__submit">So'z qo'shish</AuthSubmit>
        </form>
      </FormModal>
    </>
  );
}

export default AddWord;