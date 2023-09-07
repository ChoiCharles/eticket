package org.oao.eticket.domain.application.model;

import lombok.*;

@Value
public class User {
    UserId id;
    String username;
    String password;
    String nickname;
    String email;
    BlockChainWallet blockChainWallet;
    UserRole role;

    @Value
    public static class UserId {
        int value;

        public static UserId of(final int value) {
            return new UserId(value);
        }
    }

}
