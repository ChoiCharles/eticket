package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.Vacancy;
import org.oao.eticket.application.port.in.dto.PreemptVacancyCommand;

public interface PreemptVacancyUseCase {
    Boolean preemptVacancy(final PreemptVacancyCommand cmd);
}
