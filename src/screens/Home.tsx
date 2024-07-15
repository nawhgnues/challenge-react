// import styled from "styled-components";
import { useEffect, useState } from "react"; // useState 추가
import { region } from "../constant";
import Card from "../components/Card";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { langSettingAtom } from "../atom";

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

const LangSetting = styled.div`
  position: absolute;
  top: 50px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;

  button {
    margin-right: 10px;
    background-color: transparent;
    border: none;
    transition: 0.1s ease-in-out all;
    cursor: pointer;
    color: #6e6e6e;
    font-weight: 800;

    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }

  .selected {
    color: ${(props) => props.theme.accentColor};
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
  const [lang, setLang] = useRecoilState(langSettingAtom);

  const checkSelectedLang = () => {
    [...document.querySelectorAll(".langSelector")].map((item) => {
      item.classList.remove("selected");
    });

    switch (localStorage.getItem("lang")) {
      case "ja_JP":
        document.querySelector(".langSelector-ja_JP")?.classList.add("selected");
        break;
      case "en_US":
        document.querySelector(".langSelector-en_US")?.classList.add("selected");
        break;
      case "vi_VN":
        document.querySelector(".langSelector-vi_VN")?.classList.add("selected");
        break;
      case "zh_CN":
        document.querySelector(".langSelector-zh_CN")?.classList.add("selected");
        break;
      default:
        document.querySelector(".langSelector-ko_KR")?.classList.add("selected");
    }
  };

  const settingLang = (code: string) => {
    localStorage.setItem("lang", code);
    setLang(localStorage.getItem("lang")!);
    checkSelectedLang();
  };

  useEffect(() => {
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", "ko_KR");
      setLang(localStorage.getItem("lang")!);
    }

    checkSelectedLang();
    (async () => {
      const response = await (
        await fetch(
          `https://ddragon.leagueoflegends.com/cdn/14.13.1/data/${localStorage.getItem("lang")}/champion.json`
        )
      ).json();
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
  }, [lang]);

  return (
    <CardWrapper>
      <LangSetting>
        {region.map((item, idx) => {
          return (
            <button
              key={idx}
              onClick={() => settingLang(item.code)}
              className={`langSelector langSelector-${item.code}`}
            >
              {item.country}
            </button>
          );
        })}
      </LangSetting>
      <Helmet>
        <title>{`${champions === undefined ? "Loading..." : "LOL Champions"}`}</title>
      </Helmet>
      {champions.map((champion) => {
        return <Card key={champion.id} championInfo={champion.data} />;
      })}
    </CardWrapper>
  );
}

export default Home;
