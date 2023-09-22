package org.oao.eticket.adapter.out.persistence.repository;

import org.oao.eticket.application.domain.model.Vacancy;
import org.oao.eticket.application.port.out.LoadVacanciesRedisCommand;
import org.oao.eticket.application.port.out.LoadVacanciesRedisPort;

import java.util.List;

public class VacanciesRedisRepository implements LoadVacanciesRedisPort {
    @Override
    public List<Vacancy> getVacancies(LoadVacanciesRedisCommand cmd) {
        return null;
    }
}
