import AuthDescription from "components/auth/description/description";
import AuthForm from "components/auth/form/form";
import AuthSubmit from "components/auth/submit/submit";
import AuthTitle from "components/auth/title/title";
import Container from "components/container/container";
import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";

import { FC } from "react";

import "./password-recovery.scss";

const PasswordRecovery:FC = function() {
  return (
    <AuthForm className="password-recovery" method="POST">
      <Container className="auth-form__container">
        <AuthTitle>Password Recovery</AuthTitle>
        <AuthDescription>Enter the E-mail you provided during registration - we will send you a link to restore your password</AuthDescription>

        <AuthFields>
          <AuthField required label="Yangi parol" type="password" />
          <AuthField required label="Yangi parolni qayta kiriting" type="password" />
        </AuthFields>

        <AuthSubmit className="password-recovery__submit">Tasdiqlash</AuthSubmit>
      </Container>
    </AuthForm>
  );
}

export default PasswordRecovery;