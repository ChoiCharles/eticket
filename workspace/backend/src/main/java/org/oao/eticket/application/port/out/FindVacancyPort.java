package org.oao.eticket.application.port.out;

import org.oao.eticket.adapter.out.persistence.entity.VacancyRedisEntity;

public interface FindVacancyPort {
    VacancyRedisEntity findVacancy(FindVacancyCommand cmd);
}
