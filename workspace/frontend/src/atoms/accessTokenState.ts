import { atom } from 'recoil';

const accessTokenState = atom({
  key: 'accessTokenState',
  default: null, // 초기값은 null 또는 초기에 가지고 있는 값
});

export default accessTokenState;
