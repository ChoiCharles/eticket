import useMovePage from 'hooks/useMovePage';
import React from 'react';

function Error() {
  const { movePage } = useMovePage();
  const goHome = (url: string) => {
    movePage(url, null);
  };
  return (
    <div>
      <div>404</div>
      <div>ErrorPage입니다</div>
      <button type="button" onClick={() => goHome('/')}>
        홈으로 이동하기
      </button>
    </div>
  );
}

export default Error;
