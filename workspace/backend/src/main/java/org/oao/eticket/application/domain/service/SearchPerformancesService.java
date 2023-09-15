package org.oao.eticket.application.domain.service;

import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.in.SearchPerformancesUseCase;

import java.util.List;

public class SearchPerformancesService implements SearchPerformancesUseCase {

  @Override
  public List<Performance> search(String keyword) {
    return null;
  }
}
