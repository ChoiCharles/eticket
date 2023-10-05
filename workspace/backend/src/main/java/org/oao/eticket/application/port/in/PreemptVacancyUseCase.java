package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.PerformanceScheduleSeatTable;
import org.oao.eticket.application.domain.model.Vacancy;
import org.oao.eticket.application.port.in.dto.PreemptVacancyCommand;

public interface PreemptVacancyUseCase {
    PerformanceScheduleSeatTable preemptVacancy(final PreemptVacancyCommand cmd);
}
