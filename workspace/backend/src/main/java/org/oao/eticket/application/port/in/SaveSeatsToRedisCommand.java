package org.oao.eticket.application.port.in;

import lombok.Builder;
import lombok.Value;
import org.oao.eticket.application.domain.model.SeatInfo;

import java.util.List;

@Value
@Builder
public class SaveSeatsToRedisCommand {
    Integer performanceScheduleId;
    List<SeatInfo> seatInfoList;
}
