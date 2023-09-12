package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "performance_schedule")
public class PerformanceScheduleJpaEntity {
    @Id
    @Column(name = "performance_schedule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performance_id")
    private PerformanceJpaEntity performanceJpaEntity;

    @Column(name = "start_date_time")
    private LocalDateTime startDateTime;

    @Column(name = "running_time")
    private Integer runningTime;

    @Column(name = "ticketing_date_time")
    private LocalDateTime ticketingDateTime;

    @Builder
    public PerformanceScheduleJpaEntity(Integer id, PerformanceJpaEntity performanceJpaEntity, LocalDateTime startDateTime, Integer runningTime, LocalDateTime ticketingDateTime) {
        this.id = id;
        this.performanceJpaEntity = performanceJpaEntity;
        this.startDateTime = startDateTime;
        this.runningTime = runningTime;
        this.ticketingDateTime = ticketingDateTime;
    }
}
