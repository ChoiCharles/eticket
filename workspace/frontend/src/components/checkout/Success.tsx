import React from 'react';
import useMovePage from 'hooks/useMovePage';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import instance from 'apis/utils/instance';

const Success = () => {
  const { movePage } = useMovePage();

  const handleReserveBtnClick = async () => {
    const requestBody = {
      performanceScheduleId: 2,
      seatId: 1,
      paymentAmount: 0,
    };
    try {
      const response = await instance.post('/api/reservations', requestBody);
      console.log(response);
      movePage('/my', null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      height="100vh"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 150, mb: 3 }} color="primary" />
      <Typography variant="h5">결제가 완료되었습니다!</Typography>
      <Button
        sx={{
          width: '90%',
          position: 'fixed',
          bottom: 20,
          color: 'white',
          fontSize: '20px',
        }}
        variant="contained"
        onClick={handleReserveBtnClick}
      >
        확인
      </Button>
    </Box>
  );
};

export default Success;
