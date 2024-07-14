import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atom";

const ToggleButton = styled.button<{ isDark: boolean }>`
  position: absolute;
  top: 43px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 30px;
  z-index: 9999;
  background-color: ${(prop) => prop.theme.bgColor};
  border: 1px solid ${(prop) => prop.theme.accentColor};
  cursor: pointer;

  div {
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${(props) => props.theme.accentColor};
    border-radius: 50%;
    transition: 0.3s ease-in-out all;
    transform: ${(props) => (props.isDark ? "translateX(-30px)" : "translateX(30px)")};
  }
`;

export default function DarkmodeButton() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  return (
    <ToggleButton onClick={() => setIsDark((prev) => !prev)} isDark={isDark}>
      <div></div>
    </ToggleButton>
  );
}
