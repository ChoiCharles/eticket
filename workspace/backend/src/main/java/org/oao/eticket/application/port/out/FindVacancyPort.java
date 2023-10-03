package org.oao.eticket.application.port.out;

import org.oao.eticket.adapter.out.persistence.entity.VacancyRedisEntity;
import org.oao.eticket.application.port.out.dto.FindVacancyCommand;

public interface FindVacancyPort {
    VacancyRedisEntity findVacancy(FindVacancyCommand cmd);
}
