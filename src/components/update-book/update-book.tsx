import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthSubmit from "components/auth/submit/submit";
import FormModal from "components/form-modal/form-modal";
import { Weights } from "consts";
import { FC } from "react";

const UpdateBook:FC = function() {
  return (
    <FormModal title="Update book" description="Bu yerdan kitobni o'zgartirasiz" opened={true}>
      <form className="update-book">
        <AuthFields className="update-book__books">
          <AuthField label="Kitob nomi" />
        </AuthFields>

        <AuthSubmit className="" weight={Weights.semiBold}>Update</AuthSubmit>
      </form>
    </FormModal>
  );
}

export default UpdateBook;