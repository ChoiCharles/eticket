package org.oao.eticket.domain.port.inbound;

import org.oao.eticket.domain.application.model.User;

public interface JoinMembershipPort {
    User join(JoinMembershipCommand cmd);
}
