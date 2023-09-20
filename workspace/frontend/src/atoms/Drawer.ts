import { atom } from 'recoil';

const drawerState = atom<boolean>({
  key: 'drawerState',
  default: false,
});

export default drawerState;
