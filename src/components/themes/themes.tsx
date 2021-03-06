import AddTheme from "components/add-theme/add-theme";
import ThemeCardSkeleton from "components/loaders/theme-card-skeleton/theme-card-skeleton";
import ThemeCard from "components/theme-card/theme-card";
import Title from "components/title/title";
import { Theme } from "consts";
import { useAuth } from "contexts/auth";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "utils/client";

import "./themes.scss";

const Themes:FC = function() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [ themes, setThemes ] = useState<Theme[]>([]);

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: "book_themes_" + id,
    queryFn: () => {
      return client("themes", {
        method: "GET",
        token: user?.token,
        headers: {
          "book": id
        }
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });
  
  useEffect(() => {
    if (data) {      
      setThemes(data.data);
    }
  }, [data]);

  const handleThemeAdded = (theme:Theme) => {
    setThemes([
      theme,
      ...themes,
    ]);

    navigate(`/theme/${theme.id}`);
  }
  
  
  return (
    <section className="themes">
      <div className="themes__header">
        <Title className="themes__heading">Themes</Title>
      </div>
      {
        isLoading && !data
        && (
          <>
            <ThemeCardSkeleton />
            <ThemeCardSkeleton />
          </>
        )
      }
      {
        themes.length
          ? (
            <div className="themes__list">
              {themes.map((theme:any) => <ThemeCard key={theme.id} {...theme} />)}
            </div>
          )
          : data && <p>No themes to show. Please, add</p>
      }

      <AddTheme onThemeAdded={handleThemeAdded} />
    </section>
  );
};

export default Themes;