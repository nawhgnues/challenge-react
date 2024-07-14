// import styled from "styled-components";
import { useEffect, useState } from "react"; // useState 추가
import { API_URL } from "../constant";
import Card from "../components/Card";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 376px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export interface ChampionCardInfoData {
  name: string;
  tags: string[];
  title: string;
  id: string;
}
interface ChampionCardInfoList {
  data: ChampionCardInfoData;
  id: string;
}

function Home() {
  const [champions, setChampions] = useState<ChampionCardInfoList[]>([]);

  useEffect(() => {
    (async () => {
      const response = await (await fetch(API_URL)).json();
      const championCardInfoList: ChampionCardInfoList[] = [];

      Object.keys(response.data).map((champion) => {
        const championCardInfo = {
          id: champion,
          data: response.data[champion],
        };
        championCardInfoList.push(championCardInfo);
      });
      setChampions(championCardInfoList);
    })();
  }, []);

  return (
    <CardWrapper>
      {champions.map((champion) => {
        return <Card key={champion.id} championInfo={champion.data} />;
      })}
    </CardWrapper>
  );
}

export default Home;
