package org.oao.eticket.adapter.out.persistence.repository;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.adapter.out.persistence.entity.VacancyRedisEntity;
import org.oao.eticket.application.domain.model.Vacancy;
import org.oao.eticket.application.port.out.dto.FindVacancyCommand;
import org.oao.eticket.application.port.out.FindVacancyPort;
import org.oao.eticket.application.port.out.dto.LoadVacanciesRedisCommand;
import org.oao.eticket.application.port.out.LoadVacanciesRedisPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

import java.util.List;

@PersistenceAdapter
@RequiredArgsConstructor
public class VacanciesRedisRepository implements LoadVacanciesRedisPort, FindVacancyPort {
  @Override
  public List<Vacancy> getVacancies(LoadVacanciesRedisCommand cmd) {
    return null;
  }

  @Override
  public VacancyRedisEntity findVacancy(FindVacancyCommand cmd) {
    return null;
  }
}
