package org.oao.eticket.application.port.in;

import lombok.Value;

@Value
public class UserDetails {
    int id;
    String username;
    String nickname;
    String email;
    byte[] walletAddress;
    String role;
}
