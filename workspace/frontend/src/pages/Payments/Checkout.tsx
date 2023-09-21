import React, { useEffect, useRef } from 'react';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import { Box, Button, Paper, Typography } from '@mui/material';

const selector = '#payment-widget';
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

const Checkout = () => {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);
  const price = 50_000;

  useEffect(() => {
    (async () => {
      // ------  결제위젯 초기화 ------
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제

      // ------  결제위젯 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price },
      );

      // ------  이용약관 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  const handlePay = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      await paymentWidget?.requestPayment({
        orderId: 'asdfasd',
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      // 에러 처리하기
      console.error(error);
    }
  };

  return (
    <Box sx={{ px: 3 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        elevation={0}
      >
        <Typography variant="h3" sx={{ mt: 10, mb: 3 }}>
          주문서
        </Typography>
        <Typography variant="h5">{`${price.toLocaleString()}원`}</Typography>
      </Paper>
      <div>
        <div id="payment-widget" />
        <div id="agreement" />
      </div>
      <Button
        type="button"
        variant="contained"
        size="large"
        fullWidth
        onClick={handlePay}
      >
        결제하기
      </Button>
    </Box>
  );
};

export default Checkout;
