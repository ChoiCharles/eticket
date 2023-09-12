package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Seat;
import org.oao.eticket.application.port.out.LoadSeatPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadSeatPersistenceAdapter implements LoadSeatPort {

  private final SeatRepository seatRepository;
  private final SeatMapper seatMapper;

  @Override
  public Seat loadById(Integer id) {
    return seatMapper.mapToDomainEntity(seatRepository.findById(id).get());
  }
}
