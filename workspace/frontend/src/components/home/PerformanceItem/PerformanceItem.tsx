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
  image: string;
  title: string;
  location: string;
  date: string;
};

interface Props {
  item: Item;
}

function PerformanceItem({ item }: Props) {
  return (
    <Card sx={{ minWidth: '150px' }} elevation={0}>
      <CardActionArea>
        <CardMedia
          sx={{ width: '100%', borderRadius: 1 }}
          component="img"
          image={item.image}
          alt="img"
        />
        <CardContent sx={{ p: 0.5 }}>
          <Typography
            sx={{
              fontSize: '16px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            component="div"
          >
            {item.title}
          </Typography>
          <Typography sx={{ fontSize: '10px' }} variant="body2">
            {item.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PerformanceItem;
