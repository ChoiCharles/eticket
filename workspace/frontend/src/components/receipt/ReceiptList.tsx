import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import items from 'dummys';
import instance from 'apis/utils/instance';
import ReceiptListItem from './ReceiptListItem';

const ReceiptList = () => {
  const getMyTickets = async () => {
    try {
      const token = localStorage.getItem('accesstoken');
      if (token !== null) {
        const userId = JSON.parse(atob(token.split('.')[1])).sub;

        const response = await instance.get(`/api/reservations/${userId}`);
        console.log(response);
        // setMyTickets(response)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyTickets();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', px: 1 }}>
      {items.map(item => {
        return <ReceiptListItem item={item} />;
      })}
    </Box>
  );
};

export default ReceiptList;
