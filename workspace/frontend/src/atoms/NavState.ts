import { atom } from 'recoil';

export const searchState = atom<boolean>({
  key: 'searchState',
  default: false,
});

export const drawerState = atom<boolean>({
  key: 'drawerState',
  default: false,
});
