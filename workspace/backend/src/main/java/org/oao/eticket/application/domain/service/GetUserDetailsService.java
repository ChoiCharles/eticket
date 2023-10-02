package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.User;
import org.oao.eticket.application.port.in.dto.UserDto;
import org.oao.eticket.application.port.in.mapper.UserMapper;
import org.oao.eticket.application.port.out.LoadUserPort;
import org.oao.eticket.common.annotation.UseCase;

@UseCase
@RequiredArgsConstructor
public class GetUserDetailsService implements UserMapper.GetUserDetailsUseCase {

  private final LoadUserPort loadUserPort;
  private final UserMapper userMapper;

  @Override
  public UserDto getByUserId(final User.UserId userId) {
    return userMapper.mapToUserDto(loadUserPort.loadById(userId));
  }
}
