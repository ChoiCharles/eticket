import React, { useState, useEffect } from 'react';
import './SeatSection.scss';
import SeatItem from 'components/common/SeatItem/SeatItem';
import { useRecoilState } from 'recoil';
import SelectSeatState from 'atoms/SelectSeatState';
import seatClassRelation from 'seatClassRelation';

function SeatSection({ index }: { index: number }) {
  const sectionId = index;
  console.log('index', index);
  const sectionClass = seatClassRelation[sectionId];
  console.log(sectionClass);

  const [isModalOpen, setModalOpen] = useState(false);
  const [, setSelectedSeats] = useRecoilState(SelectSeatState);

  const selectSeat = () => {
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
    <div>
      {sectionClass.seat_class_id === 1 ? (
        <div className="seat-section">
          <div onClick={selectSeat} className="seat-section-box" aria-hidden>
            VIP
          </div>

          {/* 모달 */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <SeatItem index={sectionId} classNum={1} />
                <button type="button" onClick={closeModal}>
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="seat-section">
          <div onClick={selectSeat} className="seat-section-box2" aria-hidden>
            BASIC
          </div>

          {/* 모달 */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <SeatItem index={sectionId} classNum={2} />
                <button type="button" onClick={closeModal}>
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SeatSection;
