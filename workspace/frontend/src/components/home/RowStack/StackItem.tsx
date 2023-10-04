import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

type Item = {
  id: { value: number };
  performanceScheduleList: string[];
  posterImagePath: string;
  ticketingOpenDateTime: string;
  title: string;
};

interface Props {
  item: Item;
}

const StackItem = ({ item }: Props) => {
  const itemLength = item.performanceScheduleList.length;

  return (
    <Card sx={{ minWidth: '150px' }} elevation={0}>
      <CardActionArea>
        <CardMedia
          sx={{ width: '100%', borderRadius: 1 }}
          component="img"
          image={item.posterImagePath}
          alt="img"
        />
        <CardContent sx={{ p: 0.5 }}>
          <Typography variant="body1" noWrap>
            <b>{item.title}</b>
          </Typography>
          <Typography variant="body2">
            {`${item.performanceScheduleList[0]} ~ ${
              item.performanceScheduleList[itemLength - 1]
            }`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default StackItem;
