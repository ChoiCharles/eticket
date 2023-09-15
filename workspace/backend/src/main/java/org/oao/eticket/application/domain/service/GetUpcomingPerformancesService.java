package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.in.GetUpcomingPerformancesUsecase;
import org.oao.eticket.common.annotation.UseCase;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetUpcomingPerformancesService implements GetUpcomingPerformancesUsecase {
  @Override
  public List<Performance> getUpcomingPerformances() {
    return null;
  }
}
