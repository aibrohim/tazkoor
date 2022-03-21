import { FC, useState } from "react";
import Button from "components/button/button";
import FormModal, { ModalProps } from "components/form-modal/form-modal";
import { Colors, GameTypes, Language, Weights, WordRelationType } from "consts";

import { ReactComponent as Reverse } from "assets/icons/reverse.svg";

import "./choose-language-modal.scss";
import AuthSubmit from "components/auth/submit/submit";
import { useNavigate, useParams } from "react-router-dom";

interface Props extends ModalProps {
  type: WordRelationType;
  gameType?: GameTypes;
  language_native: Language;
  language_translate: Language;
}

const ChooseLanguageModal:FC<Props> = function({ type, gameType, title = "", language_native, language_translate, ...props }) {
  const [ isReversed, reverse ] = useState<boolean>(false);

  const { id } = useParams();

  const naviagate = useNavigate();

  const handleFormSubmit = () => {
    naviagate(`/game/${gameType}/${type}/${id}?isReversed=${isReversed}`);
  };

  return (
    <FormModal title="Tilni tanlang" description="Karta o'yinini o'ynash uchun asosiy va qo'shimcha tilni tanlang" {...props}>
      <form onSubmit={handleFormSubmit} className="choose-language-modal">
        <div className={"choose-language-modal__languages " + (isReversed ? "choose-language-modal__languages--reversed" : "")}>
          <Button
            className="choose-language-modal__language"
            color={Colors.muted}
            weight={Weights.regular}
            type="button"
            data-readonly="true"
          >
            {language_native.title}
          </Button>
          <button type="button" onClick={() => reverse(!isReversed)} className="choose-language-modal__language-reverser">
            <Reverse />
          </button>
          <Button
            className="choose-language-modal__language"
            color={Colors.muted}
            weight={Weights.regular}
            type="button"
            data-readonly="true"
          >
            {language_translate.title}
          </Button>
        </div>

        <AuthSubmit className="choose-language-modal__submit">Boshlash</AuthSubmit>
      </form>
    </FormModal>
  );
}

export default ChooseLanguageModal;