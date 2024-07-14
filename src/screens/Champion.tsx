import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ChampInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

const SplashImg = styled.img`
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
  border-radius: 30px;
`;

const ChampName = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 20px;
`;

const ChampStroy = styled.p`
  width: 100%;
  max-width: 500px;
  font-size: 0.8rem;
  margin-bottom: 70px;
  line-height: 1.5;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const SkillBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h2 {
    margin-bottom: 20px;
    font-weight: 800;
  }

  h3 {
    margin-bottom: 10px;
    font-weight: 800;
  }

  ul {
    margin-bottom: 20px;
  }

  li {
    font-size: 0.8rem;
    margin-bottom: 10px;
    line-height: 1.3;
  }
`;

const TipBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h2 {
    margin-bottom: 20px;
    font-weight: 800;
  }

  p {
    font-size: 1rem;
    margin-bottom: 10px;
    font-weight: 800;
  }

  ul {
    margin-bottom: 20px;
  }

  li {
    font-size: 0.8rem;
    margin-bottom: 10px;
    line-height: 1.3;
  }
`;

const BackButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 0;

  a {
    padding: 10px;
    color: ${(props) => props.theme.accentColor};
    font-weight: 800;
    font-size: 0.8rem;
    text-decoration: none;
    opacity: 0.5;
    transition: 0.1s ease-in-out all;
  }

  a:hover {
    opacity: 1;
  }
`;

interface Spell {
  id: string;
  name: string;
  description: string;
}
interface ChampionsInfo {
  lore: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  spells: Spell[];
  passive: string;
  name: string;
  title: string;
}

function Champion() {
  const param = useParams();
  const [champInfo, setChampInfo] = useState<ChampionsInfo>();

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(`https://ddragon.leagueoflegends.com/cdn/14.13.1/data/ko_KR/champion/${param.championId}.json`)
      ).json();
      setChampInfo(response.data[param.championId!]);
    })();
  }, []);

  const key = ["Q", "W", "E", "R"];
  return (
    <ChampInfoContainer>
      <BackButtonWrapper>
        <Link to={"/home"}>← Champion list</Link>
      </BackButtonWrapper>
      <SplashImg
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${param.championId}_0.jpg`}
        alt="Champ Splash Img"
      />
      <ChampName>
        {champInfo?.name}, {champInfo?.title}
      </ChampName>
      <ChampStroy>{champInfo?.lore}</ChampStroy>

      <ContentsBox>
        <SkillBox>
          <h2># Skills</h2>
          <ul>
            {champInfo?.spells.map((spell, idx) => {
              return (
                <li key={idx}>
                  <h3>
                    {spell.name}({key[idx]})
                  </h3>
                  <p>{spell.description}</p>
                </li>
              );
            })}
          </ul>
        </SkillBox>

        <TipBox>
          <h2># Tips</h2>
          <ul>
            {champInfo?.allytips.map((tip, index) => {
              return <li key={index}>{tip}</li>;
            })}
          </ul>

          <ul>
            <p>vs {champInfo?.name}</p>
            {champInfo?.enemytips.map((tip, index) => {
              return <li key={index}>{tip}</li>;
            })}
          </ul>
        </TipBox>
      </ContentsBox>
    </ChampInfoContainer>
  );
}

export default Champion;
