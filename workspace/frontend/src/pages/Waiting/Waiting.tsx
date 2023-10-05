import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMovePage from 'hooks/useMovePage';
import BackNavBar from 'components/common/BackNavBar/BackNavBar';
import { Box, LinearProgress, Typography, Modal } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Client } from '@stomp/stompjs';

import Captcha from 'components/common/Captcha/Captcha';
import instance from 'apis/utils/instance';

const protocol = /https$/.test(window.location.protocol) ? 'wss' : 'ws';
const URL = `${protocol}://${window.location.origin.split('//')[1]}/ws`;

const Waiting = () => {
  const [order, setOrder] = useState<number | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  console.log(connected);
  console.log(stompClient);

  const { waitingId, dateId } = useParams();
  const { movePage } = useMovePage();

  const [openCaptcha, setOpenCaptcha] = useState<boolean>(true);

  const userId = 9;

  const requestBody = {
    userId,
    performanceScheduleId: 2,
  };

  const postWaiting = async () => {
    try {
      const response = await instance.post('/api/waiting', requestBody);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteTicketing = async () => {
  //   await instance
  //     .delete('/api/ticketing', {
  //       data: {
  //         userId,
  //         performanceScheduleId: 2,
  //       },
  //     })
  //     .then(response => console.log(response))
  //     .catch(error => console.log(error));
  // };

  useEffect(() => {
    if (openCaptcha === false) {
      postWaiting();
      const client = new Client({
        brokerURL: URL,
        reconnectDelay: 5000,
        debug: str => console.log(str),
      });

      client.onConnect = () => {
        setConnected(true);
        setStompClient(client);

        client.subscribe(`/sub/userId/${userId}`, response => {
          const message = JSON.parse(response.body);
          console.log(message);
          setOrder(Number(message.order) + 1);

          if (message.myTurn) {
            movePage(`/seat/${waitingId}/${dateId}`, null);
          }
        });
      };

      client.onDisconnect = () => {
        setConnected(false);
        setStompClient(null);
      };

      client.activate();

      return () => {
        client.deactivate();
      };
    }
  }, [openCaptcha]);

  return (
    <>
      <BackNavBar title="" />
      <Modal open={openCaptcha}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '70%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Captcha setOpenCaptcha={setOpenCaptcha} />
        </Box>
      </Modal>
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
