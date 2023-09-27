package org.oao.eticket.application.domain.model;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceSummary {
    PerformanceSummaryId id;
    String title;
    String posterImagePath;
    List<PerformanceSchedule> performanceScheduleList;

    @Getter
    @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
    public static class PerformanceSummaryId {
        private final int value;

        public static PerformanceSummary.PerformanceSummaryId of(final int value) {
            return new PerformanceSummary.PerformanceSummaryId(value);
        }
    }
}
