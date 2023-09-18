package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.User;

public interface JoinMembershipUseCase {
  User join(JoinMembershipCommand cmd);
}
