package org.oao.eticket.domain.application.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.domain.application.model.BlockChainWallet;
import org.oao.eticket.domain.application.model.User;
import org.oao.eticket.domain.application.model.UserRole;
import org.oao.eticket.domain.port.inbound.JoinMembershipCommand;
import org.oao.eticket.domain.port.inbound.JoinMembershipUseCase;
import org.oao.eticket.domain.port.outbound.CreateUserCommand;
import org.oao.eticket.domain.port.outbound.CreateUserPort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
class JoinMembershipService implements JoinMembershipUseCase {
    private final CreateUserPort createUserPort;

    @Override
    public User join(final JoinMembershipCommand cmd) {
        final var createUserCommand = new CreateUserCommand(
                cmd.getUsername(),
                cmd.getPassword(),
                cmd.getEmail(),
                cmd.getNickname(),
                BlockChainWallet.NULL_WALLET.getAddress(),
                UserRole.GUEST
        );
        return createUserPort.create(createUserCommand);
    }

}
