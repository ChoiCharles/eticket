package org.oao.eticket.domain.port.inbound;

import lombok.Value;

@Value
public class JoinMembershipCommand {
    String username;
    String password;
    String email;
    String nickname;
}
