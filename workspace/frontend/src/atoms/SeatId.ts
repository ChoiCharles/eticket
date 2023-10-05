import { atom } from 'recoil';

const SeatId = atom<number | null>({
  key: 'SelectSeatId',
  default: null,
});

export default SeatId;
