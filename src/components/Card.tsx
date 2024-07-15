import { Link } from "react-router-dom";
import { ChampionCardInfoData } from "../screens/Home";
import styled from "styled-components";

const CardFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 376px) {
    align-items: center;
  }
`;

const ChampImg = styled.img`
  width: 100%;
  max-width: 80%;
  margin-bottom: 20px;
  opacity: 0.5;
  transition: 0.3s ease-in-out all;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ChampNameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-weight: 100;
`;

const RoleList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    font-size: 0.8rem;
    margin-right: 10px;
  }
`;

const ChampName = styled.h1`
  font-size: 1rem;
  margin-bottom: 10px;
  word-break: keep-all;
`;

const Card = ({ championInfo: { name, title, tags, id } }: { championInfo: ChampionCardInfoData }) => {
  const img = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;

  return (
    <CardFrame>
      <Link to={`/challenge-react/champion/${id}`}>
        <ChampImg src={img} alt="" />
      </Link>
      <ChampNameBox>
        <ChampName>
          {name} - {title}
        </ChampName>
        <RoleList>
          {tags.map((tag, idx) => {
            return <li key={idx}>{tag}</li>;
          })}
        </RoleList>
      </ChampNameBox>
    </CardFrame>
  );
};

export default Card;
