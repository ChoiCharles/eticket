package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.oao.eticket.application.domain.model.TicketStatus;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reservation")
public class ReservationJpaEntity {

  @Id
  @Column(name = "reservation_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserJpaEntity user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "performance_schedule_id")
  private PerformanceScheduleJpaEntity performanceSchedule;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "seat_id")
  private SeatJpaEntity seat;

  @Column(name = "payment_amount")
  private Integer paymentAmount;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private TicketStatus ticketStatus;

  @Column(name = "reservation_time")
  private LocalDateTime reservationTime;

  @Builder
  public ReservationJpaEntity(
      Integer id,
      UserJpaEntity user,
      PerformanceScheduleJpaEntity performanceSchedule,
      SeatJpaEntity seat,
      Integer paymentAmount,
      TicketStatus ticketStatus,
      LocalDateTime reservationTime) {
    this.id = id;
    this.user = user;
    this.performanceSchedule = performanceSchedule;
    this.seat = seat;
    this.paymentAmount = paymentAmount;
    this.ticketStatus = ticketStatus;
    this.reservationTime = reservationTime;
  }
}
