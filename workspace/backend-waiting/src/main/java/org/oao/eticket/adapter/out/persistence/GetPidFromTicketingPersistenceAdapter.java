package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.out.GetPidFromTicketingPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

import java.util.Set;

@PersistenceAdapter
@RequiredArgsConstructor
public class GetPidFromTicketingPersistenceAdapter implements GetPidFromTicketingPort {

  private final TicketingRepository ticketingRepository;

  @Override
  public Set<String> getPidFromTicketing() {
    String pattern = "Ticketing::*";
    return ticketingRepository.getKeys(pattern);
  }
}
