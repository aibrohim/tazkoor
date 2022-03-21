import AuthDescription from "components/auth/description/description";
import AuthFields from "components/auth/fields/fields";
import AuthForm from "components/auth/form/form";
import AuthSubmit from "components/auth/submit/submit";
import Container from "components/container/container";
import Field from "components/auth/field/field";
import MainHeader from "components/main-header/main-header";
import Nav from "components/nav/nav";
import Title from "components/title/title";
import { Language, Weights } from "consts";
import { FC, useEffect, useRef } from "react";

import "./add-book.scss";
import { useMutation, useQuery } from "react-query";
import { client } from "utils/client";
import { useAuth } from "contexts/auth";
import { useNavigate } from "react-router-dom";

interface MutationProps {
  title: string;
  language_native: number;
  language_translate: number
}

const AddBook:FC = function() {
  const wrapperRef = useRef<any>();

  const { token } = useAuth();

  const navigate = useNavigate();

  const { mutate, isLoading, data: responseData } = useMutation(({title, language_native, language_translate} : MutationProps) => {  
    return client("books", {
      data: {
        title,
        language_native,
        language_translate
      },
      token: token
    });
  });

  const {
    data,
    isLoading: langsLoading,
  } = useQuery({
    queryKey: "langs",
    queryFn: () => {
      return client("langs", {
        method: "GET",
        token,
      })
    },
    enabled: true,
    refetchInterval: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (responseData?.okay === true) {
      navigate("/book/" + responseData.book[0].id)
    }
  }, [navigate, responseData]);

  useEffect(() => {
    if (data && wrapperRef) {
      wrapperRef.current.querySelector("#nativeLanguage").value = data.data[0].id;
      wrapperRef.current.querySelector("#translateLanguage").value = data.data[1].id;
    }
  }, [data]);

  const handleFormSubmit = (evt:any) => {
    evt.preventDefault();

    const title = wrapperRef?.current.querySelector("#title").value;
    const nativeLang = +wrapperRef?.current.querySelector("#nativeLanguage").value;
    const translateLang = +wrapperRef?.current.querySelector("#translateLanguage").value;
    
    if (title) {
      mutate({
        title: title,
        language_native: nativeLang,
        language_translate: translateLang
      });
    }
  };
  

  return (
    <>
      <MainHeader />
      <main ref={wrapperRef}>
        <AuthForm onSubmit={handleFormSubmit} className="add-book">
          <Container className="auth-form__container">
            <Title className="add-book__title">Add Book</Title>
            <AuthDescription className="add-book__description">
              Whether a medieval typesetter chose to garble a well-known
            </AuthDescription>

            <AuthFields>
              <Field id="title" label="Kitob nomi" />
              <Field id="nativeLanguage" disabled={langsLoading} type="select" label="Kitobning asl tili">
                {data?.data.map((lang: Language) => (
                  <option key={lang.id} value={lang.id}>{lang.icon}&nbsp;{lang.title}</option>
                ))}
              </Field>
              <Field id="translateLanguage" disabled={langsLoading} type="select" label="Kitobning tarjima qilingan tili">
                {data?.data.map((lang: Language) => (
                  <option key={lang.id} value={lang.id}>{lang.icon}&nbsp;{lang.title}</option>
                ))}
              </Field>
            </AuthFields>

            <AuthSubmit disabled={isLoading} className="add-book__submit" weight={Weights.semiBold}>
              {isLoading ? "Kitob qo'shilyapti..." : "Kitob qo'shish"}
            </AuthSubmit>
          </Container>
        </AuthForm>
      </main>
      <Nav />
    </>
  );
}

export default AddBook;