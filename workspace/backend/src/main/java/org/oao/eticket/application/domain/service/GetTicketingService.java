package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.CheckTicketingPermissionUseCase;
import org.oao.eticket.application.port.out.GetOrderPort;
import org.oao.eticket.common.annotation.UseCase;

@UseCase
@RequiredArgsConstructor
public class GetTicketingService implements CheckTicketingPermissionUseCase {

  private final GetOrderPort getOrderPort;

  @Override
  public boolean checkTicketingPermission(Integer userId, Integer performanceScheduleId) {
    long order = getOrderPort.getOrder(getKey(performanceScheduleId), userId);
    System.out.println(order);
    return order != -1;
  }

  public String getKey(Integer pid) {
    return "Ticketing::" + pid;
  }
}
