import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

type Item = {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
};

interface Props {
  item: Item;
}

const ReceiptListItem = ({ item }: Props) => {
  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        my: 1,
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="body1" noWrap>
          {item.title}
        </Typography>
        <Typography variant="body2" noWrap>
          {item.date}
        </Typography>
      </CardContent>
      <Box display="flex">
        <Button fullWidth variant="contained">
          내 티켓
        </Button>
        <Button fullWidth variant="outlined">
          취소
        </Button>
      </Box>
    </Card>
  );
};

export default ReceiptListItem;
