import { register } from "auth-provider";
import AuthBottomMsg from "components/auth/bottom-msg/bottom-msg";
import AuthDescription from "components/auth/description/description";
import AuthField from "components/auth/field/field";
import AuthFields from "components/auth/fields/fields";
import AuthForm from "components/auth/form/form";
import AuthSubmit from "components/auth/submit/submit";
import AuthTitle from "components/auth/title/title";
import AuthWays from "components/auth/ways/ways";
import Container from "components/container/container";
import { useAuth } from "contexts/auth";
import { useEffect } from "react";

import { useState } from "react";
import { FC, FormEvent } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

interface MutationProps {
  name: string;
  email: string;
  password: string;
}

const SignUp:FC = function() {
  const { mutate, isLoading, data } = useMutation(({name, email, password} : MutationProps) => {  
    return register({name, email, password});
  });

  const [ name, setName ] = useState<string>("");
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

    mutate({name, email, password});
  };

  return (
    <AuthForm onSubmit={handleFormSubmit} method="POST">
      <Container className="auth-form__container">
        <AuthTitle>Sign Up</AuthTitle>
        <AuthDescription>Contrary to popular belief, Lorem Ipsum is not simply random text.</AuthDescription>

        <AuthFields>
          <AuthField
            disabled={isLoading} 
            label="Name"
            value={name}
            onChange={(e: FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
          />
          <AuthField
            disabled={isLoading}
            required 
            label="E-mail" 
            type="email"
            value={email}
            onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} 
          />
          <AuthField
            disabled={isLoading}
            required 
            label="Password"
            type="password" 
            value={password}
            onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
          />
        </AuthFields>

        <AuthSubmit disabled={isLoading}>
          {isLoading ? "Ro'yxatdan o'tilyapti..." : "Ro'yxatdan o'tish"}
        </AuthSubmit>

        <AuthWays />
        <AuthBottomMsg>Already have an account? <Link to="/login">Login</Link></AuthBottomMsg>
      </Container>
    </AuthForm>
  )
}

export default SignUp;