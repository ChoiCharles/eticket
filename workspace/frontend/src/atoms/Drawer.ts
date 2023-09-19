import { atom } from 'recoil';

const sideBarState = atom({
  key: 'sideBarState',
  default: false,
});

export default sideBarState;
