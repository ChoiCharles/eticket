package org.oao.eticket.application.port.out;

import org.oao.eticket.adapter.out.persistence.entity.VacancyRedisEntity;
import org.oao.eticket.application.port.out.dto.PreemptVacancyCommand;

public interface PreemptVacancyPort {
    Boolean preemptVacancy(PreemptVacancyCommand cmd);
}
