import { atom } from "recoil";

export interface User {
  name: string;
  balance: number;
}
export const userAtom = atom<User>({
  key: "user",
  default: {
    name: "",
    balance: 100,
  },
});
