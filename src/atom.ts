import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const langSettingAtom = atom({
  key: "langSetting",
  default: "ko_KR",
});
