package org.oao.eticket.adapter.in.web;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.GetOrderUserCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.oao.eticket.infrastructure.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;

@WebAdapter
@RequiredArgsConstructor
public class WebSocketController {
  
  private final GetOrderUserCase getOrderUserCase;
  private final SimpMessageSendingOperations sendingOperations;

  @Value("${jwt.secret-key}")
  private String secretKey;

  @Value("${jwt.token.expired-time-ms}")
  private Long expiredTimeMs;

  @Data
  static class WaitingOrder {
    private boolean isMyTurn;
    private long order;
    private String accessToken;
  }

  @Scheduled(fixedDelay = 1000)
  private void schedule() {

    WaitingOrder waitingOrder = new WaitingOrder();
    long order = getOrderUserCase.getOrder(userId, performanceId);
    if (order != -1) {
      waitingOrder.setOrder(order);
      waitingOrder.setMyTurn(false);
      waitingOrder.setAccessToken(null);
    }
    else {
      waitingOrder.setOrder(order);
      waitingOrder.setMyTurn(true);
      waitingOrder.setAccessToken(JwtTokenUtils.generateAccessToken(userId, secretKey, expiredTimeMs));
    }
    sendingOperations.convertAndSend("/sub/chat/perform/"+performId ,result);
  }
}
