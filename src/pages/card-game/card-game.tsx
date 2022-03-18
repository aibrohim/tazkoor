import BigSpinner from "components/big-spinner/big-spinner";
import CardBody from "components/card-body/card-body";
import CardGameHeader from "components/card-game-header/card-game-header";
import { GameTypes } from "consts";
import { useAuth } from "contexts/auth";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

const CardGame = function() {
  const { token } = useAuth();

  const { wordRelation, id } = useParams();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: "card_" + id,
    queryFn: () => {
      return client("games", {
        method: "GET",
        token,
        headers: {
          [`${wordRelation}_id`]: id
        }
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });

  return (
    <>
      <CardGameHeader backUrl={`/${wordRelation}/${id}`} type={GameTypes.Card} />

      <main>
        {isLoading && <BigSpinner />}
      </main>
    </>
  )
};

export default CardGame;