import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMovePage from 'hooks/useMovePage';
import BackNavBar from 'components/common/BackNavBar/BackNavBar';
import { Box, LinearProgress, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Client } from '@stomp/stompjs';

const Waiting = () => {
  const [order, setOrder] = useState(3);
  const { waitingId } = useParams();
  const { dateId } = useParams();
  const { movePage } = useMovePage();

  const [connected, setConnected] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  console.log(connected);
  console.log(stompClient);

  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8081/ws`,
      reconnectDelay: 5000,
      debug: str => console.log(str),
    });

    client.onConnect = () => {
      setConnected(true);
      setStompClient(client);

      // client.subscribe(
      //   ,
      //   (response) => {
      //     const message = JSON.parse(response.body);
      //     console.log(message);
      //   }
      // );
    };

    client.onDisconnect = () => {
      setConnected(false);
      setStompClient(null);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(prev => prev - 3);
    }, 1000);

    if (order <= 0) {
      clearInterval(interval);
      movePage(`/seat/${waitingId}/${dateId}`, null);
    }

    return () => {
      clearInterval(interval);
    };
  }, [order, waitingId, movePage]);

  return (
    <>
      <BackNavBar title="" />
      <Box
        sx={{
          mt: '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AccessTimeIcon fontSize="large" />
        <Typography my={2} variant="h5">
          나의 대기 순서
        </Typography>
        <Typography variant="h2">{order}</Typography>
        <LinearProgress
          sx={{ width: '80%', height: 20, borderRadius: 2, my: 5 }}
        />
        <Typography variant="body1">
          현재 접속 인원이 많아 대기 중입니다.
        </Typography>
        <Typography variant="body1">
          잠시만 기다려주시면 예매 페이지로 이동합니다.
        </Typography>
        <Typography mt={2} variant="body2">
          <b>⚠주의⚠</b>
        </Typography>
        <Typography variant="body2">
          닫기, 새로고침, 뒤로가기 또는 재접속하시면
        </Typography>
        <Typography variant="body2">
          대기 순서가 초기화되어 대기 시간이 더 길어집니다.
        </Typography>
      </Box>
    </>
  );
};

export default Waiting;
