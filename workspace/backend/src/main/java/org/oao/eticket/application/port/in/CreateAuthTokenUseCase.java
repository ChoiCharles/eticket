package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.User;
import org.oao.eticket.common.Pair;

public interface CreateAuthTokenUseCase {
  Pair<String, String> create(User targetUser);
}
