package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.Performance;

import java.util.List;

public interface GetHotPerformancesUseCase {
    List<Performance> getHotPerformanceList();
}
