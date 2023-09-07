import { useNavigate } from 'react-router-dom';

const useMovePage = () => {
  const navigate = useNavigate();

  const movePage = (url: string) => {
    navigate(url);
  };
  return movePage;
};

export default useMovePage;
