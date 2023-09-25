package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.Performance;

import java.util.List;

public interface LoadUpcomingPerformancesPort {
    List<Performance> loadUpcomings();
}
