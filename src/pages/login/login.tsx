import AuthDescription from "components/auth/description/description";
import AuthForm from "components/auth/form/form";
import AuthSubmit from "components/auth/submit/submit";
import AuthTitle from "components/auth/title/title";
import Container from "components/container/container";
import AuthField from "components/auth/field/field";
import AuthWays from "components/auth/ways/ways";
import AuthBottomMsg from "components/auth/bottom-msg/bottom-msg";
import AuthFields from "components/auth/fields/fields";

import { Link, useNavigate } from "react-router-dom";
import { FC, FormEvent, useEffect, useState } from "react";

import "./login.scss";
import { useMutation } from "react-query";
import { login } from "auth-provider";
import { useAuth } from "contexts/auth";

interface MutationProps {
  email: string;
  password: string;
}

const Login:FC = function() {
  const { mutate, isLoading, data } = useMutation(({email, password} : MutationProps) => {  
    return login({email, password});
  });

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(():void => {
    if (data) {
      setUser(data ? {
        ...data.user,
        token: data.token
      } : null);
      navigate("/");
    }
  }, [navigate, setUser, data]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>):void => {
    evt.preventDefault();

    mutate({email, password});
  };

  return (
    <AuthForm onSubmit={handleFormSubmit} className="login" method="POST">
      <Container className="auth-form__container">
        <AuthTitle>Login</AuthTitle>
        <AuthDescription>Contrary to popular belief, Lorem Ipsum is not simply random text.</AuthDescription>

        <AuthFields>
          <AuthField
            required
            label="E-mail"
            type="email"
            value={email}
            onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
          />
          <AuthField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
          />
          <Link className="login__forgot-password" to="/forgot-password">Forgot your password?</Link>
        </AuthFields>

        <AuthSubmit disabled={isLoading}>{isLoading ? "Kirilyapti..." : "Kirish"}</AuthSubmit>

        <AuthWays />
        <AuthBottomMsg>Don't have an account? <Link to="/sign-up">Sign Up</Link></AuthBottomMsg>
      </Container>
    </AuthForm>
  );
}

export default Login;