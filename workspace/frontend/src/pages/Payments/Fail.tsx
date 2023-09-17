import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Fail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleBackToCheckout = () => {
    navigate('../checkout');
  };

  return (
    <div>
      <h1>결제 실패</h1>
      <div>{`사유: ${searchParams.get('message')}`}</div>
      <button type="button" onClick={handleBackToCheckout}>
        돌아가기
      </button>
    </div>
  );
};

export default Fail;
