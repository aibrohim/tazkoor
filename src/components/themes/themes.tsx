import AddTheme from "components/add-theme/add-theme";
import ThemeCard from "components/theme-card/theme-card";
import Title from "components/title/title";
import { useAuth } from "contexts/auth";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

import "./themes.scss";

const Themes:FC = function() {
  const { token } = useAuth();
  const { id } = useParams();

  useQuery({
    queryKey: "themes_" + id,
    queryFn: () => {
      return client("themes?book_id=" + id, {
        method: "GET",
        token,
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });
  
  return (
    <section className="themes">
      <div className="themes__header">
        <Title className="themes__heading">Themes</Title>
      </div>

      <div className="themes__list">
        <ThemeCard />
        <ThemeCard />
        <ThemeCard />
        <ThemeCard />
      </div>

      <AddTheme />
    </section>
  );
};

export default Themes;