import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

type Item = {
  id: number;
  performanceScheduleList: string[];
  posterImagePath: string;
  ticketingOpenDateTime: string;
  title: string;
};

interface Props {
  item: Item;
  length: number;
}

const StackItem = ({ item, length }: Props) => {
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
              item.performanceScheduleList[length - 1]
            }`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default StackItem;
