package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.Vacancy;

public interface PreemptVacancyUseCase {
    Vacancy preemptVacancy(final PreemptVacancyCommand cmd);
}
