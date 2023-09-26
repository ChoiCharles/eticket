import React from 'react';
import {
  Paper,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@mui/material';
import items from '../../../dummys';

type Item = {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
};

interface PerformanceProps {
  item: Item;
}

function Performance({ item }: PerformanceProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={item.image} alt="img" />
        <CardContent>
          <Typography variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2">{item.location}</Typography>
          <Typography variant="body2">{item.date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const RowStack = () => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        overflowX: 'auto',
      }}
    >
      <Stack direction="row" spacing={4}>
        {items.map(item => {
          return <Performance item={item} key={item.id} />;
        })}
      </Stack>
    </Paper>
  );
};

export default RowStack;
