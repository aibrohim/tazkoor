import AuthDescription from "components/auth/description/description";
import AuthForm from "components/auth/form/form";
import AuthSubmit from "components/auth/submit/submit";
import AuthTitle from "components/auth/title/title";
import Container from "components/container/container";
import AuthField from "components/auth/field/field";

import AuthFields from "components/auth/fields/fields";
import AuthBottomMsg from "components/auth/bottom-msg/bottom-msg";
import { Link, useNavigate } from "react-router-dom";

import "./forgot-password.scss";
import { FC, FormEvent } from "react";

const ForgotPassword:FC = function() {
  const navigate = useNavigate();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    navigate("/password-recovery");
  };

  return (
    <AuthForm onSubmit={handleFormSubmit} className="forgot-password" method="POST">
      <Container className="auth-form__container">
        <AuthTitle>Password Recovery</AuthTitle>
        <AuthDescription>Enter the E-mail you provided during registration - we will send you a link to restore your password</AuthDescription>

        <AuthFields>
          <AuthField required label="E-mail" type="email" />
        </AuthFields>

        <AuthSubmit>Jo'natish</AuthSubmit>

        <AuthBottomMsg className="forgot-password__bottom-msg">Don't have account? <Link to="/sign-up">Sign Up</Link></AuthBottomMsg>
      </Container>
    </AuthForm>
  );
}

export default ForgotPassword;