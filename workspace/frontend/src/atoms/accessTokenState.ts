import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null, // 초기값은 null 또는 초기에 가지고 있는 값
  effects_UNSTABLE: [persistAtom],
});

export default accessTokenState;
