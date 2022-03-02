import AuthDescription from "components/auth/description/description";
import AuthForm from "components/auth/form/form";
import AuthSubmit from "components/auth/submit/submit";
import AuthTitle from "components/auth/title/title";
import Container from "components/container/container";
import ReactCodeInput from 'react-verification-code-input';
import AuthBottomMsg from "components/auth/bottom-msg/bottom-msg";

import { Link, useNavigate } from "react-router-dom";
import { FC, FormEvent } from "react";

import "./email-verify-reset.scss";

const EmailResetVerify:FC = function() {
  const navigate = useNavigate();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    navigate("/password-recovery");
  };

  return (
    <AuthForm onSubmit={handleFormSubmit} className="email-verify-reset" method="POST">
      <Container className="auth-form__container">
        <AuthTitle>Password Recovery</AuthTitle>
        <AuthDescription>Enter the E-mail you provided during registration - we will send you a link to restore your password</AuthDescription>

        <ReactCodeInput className="email-verify-reset__inputs" fields={5} />

        <AuthSubmit>Jo'natish</AuthSubmit>

        <AuthBottomMsg className="email-verify-reset__bottom-msg">Don't have account? <Link to="/sign-up">Sign Up</Link></AuthBottomMsg>
      </Container>
    </AuthForm>
  );
}

export default EmailResetVerify;