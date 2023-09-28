import React, { useState, useEffect } from 'react';
import './SeatSection.scss';
import SeatItem from 'components/common/SeatItem/SeatItem';
import { useRecoilState } from 'recoil';
import SelectSeatState from 'atoms/SelectSeatState';

function SeatSection({ index }: { index: number }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [, setSelectedSeats] = useRecoilState(SelectSeatState);
  const selectSeat = () => {
    console.log(index);
    // 모달 열기
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSeats([]);
    // 모달 닫기
    setModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isModalOpen) {
        const modal = document.querySelector('.modal-content');
        if (modal && !modal.contains(e.target as Node)) {
          closeModal();
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="seat-section">
      <div onClick={selectSeat} className="seat-section-box" aria-hidden />

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <SeatItem index={index} />
            <button type="button" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeatSection;
