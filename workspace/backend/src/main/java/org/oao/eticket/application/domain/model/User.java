package org.oao.eticket.application.domain.model;

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

  @Getter
  @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
  public static class UserId {
    private final int value;

    public static UserId of(final int value) {
      return new UserId(value);
    }

    @Override
    public boolean equals(final Object other) {
      return other instanceof UserId && ((UserId) other).value == value;
    }

    @Override
    public String toString() {
      return Integer.toString(value);
    }

    @Override
    public int hashCode() {
      return Integer.hashCode(value);
    }
  }
}
