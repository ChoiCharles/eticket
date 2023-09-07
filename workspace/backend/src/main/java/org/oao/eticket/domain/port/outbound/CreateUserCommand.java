package org.oao.eticket.domain.port.outbound;

import lombok.Value;
import org.oao.eticket.domain.application.model.UserRole;

@Value
public class CreateUserCommand {
    String username;
    String password;
    String email;
    String nickname;
    byte[] walletAddress;
    UserRole role;
}
