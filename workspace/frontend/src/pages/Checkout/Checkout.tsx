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
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price },
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  const handlePay = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: 'asdfasd',
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ px: 3 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        elevation={0}
      >
        <Typography variant="h4" sx={{ mt: 5, mb: 3 }}>
          주문서
        </Typography>
        <Typography variant="h6">{`${price.toLocaleString()}원`}</Typography>
      </Paper>
      <div id="payment-widget" />
      <Button
        type="button"
        variant="contained"
        size="large"
        fullWidth
        sx={{ mb: 5 }}
        onClick={handlePay}
      >
        결제하기
      </Button>
    </Box>
  );
};

export default Checkout;
