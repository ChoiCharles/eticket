package org.oao.eticket.application.port.out;

import org.oao.eticket.adapter.out.persistence.entity.VacancyRedisEntity;
import org.oao.eticket.application.domain.model.PerformanceScheduleSeatTable;
import org.oao.eticket.application.port.out.dto.PreemptVacancyCommand;

public interface PreemptVacancyPort {
    PerformanceScheduleSeatTable preemptVacancy(PreemptVacancyCommand cmd);
}
