package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.Vacancy;
import org.oao.eticket.application.port.out.dto.LoadVacanciesRedisCommand;

import java.util.List;

public interface LoadVacanciesRedisPort {
    List<Vacancy> getVacancies(LoadVacanciesRedisCommand cmd);
}
