import { atom } from 'recoil';

export const searchState = atom<boolean>({
  key: 'searchState',
  default: false,
});

export const hamburgerState = atom<boolean>({
  key: 'hamburgerState',
  default: false,
});
