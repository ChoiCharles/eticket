package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.PerformanceScheduleSeatTable;

public interface SaveVacanciesRedisPort {
    void saveTable(PerformanceScheduleSeatTable table);

    PerformanceScheduleSeatTable getTable(int performanceScheduleId, int sectionId);
}
