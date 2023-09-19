import { useNavigate } from 'react-router-dom';

const useMovePage = () => {
  const navigate = useNavigate();

  const movePage = (url: string, state: object | null) => {
    navigate(url, { state });
  };
  return movePage;
};

export default useMovePage;
