import { atom } from 'recoil';

const SeatId = atom<number | null>({
  key: 'SelectSeatState',
  default: null,
});

export default SeatId;
