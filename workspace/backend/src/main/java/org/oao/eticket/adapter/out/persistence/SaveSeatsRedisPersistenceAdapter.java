package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.adapter.out.persistence.entity.PerformanceScheduleJpaEntity;
import org.oao.eticket.adapter.out.persistence.entity.SectionJpaEntity;
import org.oao.eticket.adapter.out.persistence.mapper.ConcertHallMapper;
import org.oao.eticket.adapter.out.persistence.mapper.SeatClassMapper;
import org.oao.eticket.adapter.out.persistence.mapper.SeatMapper;
import org.oao.eticket.adapter.out.persistence.mapper.SectionMapper;
import org.oao.eticket.adapter.out.persistence.repository.PerformanceScheduleRepository;
import org.oao.eticket.adapter.out.persistence.repository.SeatRepository;
import org.oao.eticket.adapter.out.persistence.repository.SectionAndSeatClassRelationRepository;
import org.oao.eticket.adapter.out.persistence.repository.SectionRepository;
import org.oao.eticket.application.domain.model.PerformanceScheduleSeatTable;
import org.oao.eticket.application.domain.model.Section;
import org.oao.eticket.application.port.out.LoadPerformanceScheduleSeatTablePort;
import org.oao.eticket.common.annotation.PersistenceAdapter;
import org.oao.eticket.exception.NoResultException;

import java.util.ArrayList;
import java.util.List;

@PersistenceAdapter
@RequiredArgsConstructor
public class SaveSeatsRedisPersistenceAdapter implements LoadPerformanceScheduleSeatTablePort {
  // repository
  private final PerformanceScheduleRepository performanceScheduleRepository;
  private final SectionRepository sectionRepository;
  private final SeatRepository seatRepository;
  private final SectionAndSeatClassRelationRepository sectionAndSeatClassRelationRepository;
  // mapper
  private final ConcertHallMapper concertHallMapper;
  private final SeatMapper seatMapper;
  private final SectionMapper sectionMapper;
  private final SeatClassMapper seatClassMapper;

  @Override
  public List<PerformanceScheduleSeatTable> loadOpeningInfo() { // 공연 예매가 오픈 되는 공연 스케줄의 좌석 테이블을 생성
    /*
    PerformanceScheduleSeatTable {
      ps ID
      concertHall {
                    section List {
                                  class, price,-
                                  seat List{ seat INFO }
                  }
     }
     */
    // 오늘 예매가 오픈 되는 공연 스케줄 가져오기
    final var scheduleJpaEntities =
        performanceScheduleRepository.loadOpeningPerformanceSchedules(); // query
    // (PerformanceScheduleSeatTable) Redis에 넣을 형식 으로 변환 (JPA -> Redis)
    if (!scheduleJpaEntities.isEmpty()) {
      List<PerformanceScheduleSeatTable> results = new ArrayList<>();
      // Performance Schedule List
      for (PerformanceScheduleJpaEntity scheduleJpa : scheduleJpaEntities) {
        List<Section> sectionList = new ArrayList<>();
        // Performance Schedule이 개최 되는 Concert Hall의 section jpa List
        final var sectionJpaEntities =
            sectionRepository.findAllByConcertHallJpaEntity(
                scheduleJpa.getPerformanceJpaEntity().getConcertHallJpaEntity()); // query
        // Section Jpa List -> Section Redis model
        for (SectionJpaEntity sectionJpa : sectionJpaEntities) {
          // 각 Section에 좌석 List 넣기
          Section section = sectionMapper.mapToDomainEntity(sectionJpa);
          section.setSeatList(
              seatMapper.mapToDomainEntity(
                  seatRepository.findAllBySectionJpaEntity(sectionJpa))); // query
          // Section에 해당하는 좌석 등급 정보 가져오기
          section.setSeatClass(
              seatClassMapper.mapToDomainEntity(
                  sectionAndSeatClassRelationRepository
                      .findSeatClassBySectionAndPerformance(
                          sectionJpa, scheduleJpa.getPerformanceJpaEntity())
                      .getSeatClassJpaEntity()));
          // 만든 하나의 구역을 리스트에 추가
          sectionList.add(section);
        }
        /// concert hall
        //        var concertHall =
        //            concertHallMapper.mapToDomainEntity(
        //                scheduleJpa.getPerformanceJpaEntity().getConcertHallJpaEntity());
        //        concertHall.setSectionList(sectionList);
        //        // 완성된 Performance Schedule의 좌석표 결과에 저장
        //        results.add(
        //            PerformanceScheduleSeatTable.builder()
        //                .performanceScheduleId(
        //
        // PerformanceScheduleSeatTable.PerformanceScheduleId.of(scheduleJpa.getId()))
        //                .concertHall(concertHall)
        //                .build());
      }
      return results;
    } else {
      throw new NoResultException("오늘 오픈 예정인 공연 없음");
    }
  }
}
