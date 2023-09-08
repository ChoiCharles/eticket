package org.oao.eticket.persistence.adapter.outbound;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.domain.application.model.User;
import org.oao.eticket.domain.port.outbound.CreateUserCommand;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    @Mapping(target = "id", expression = "java(User.UserId.of(jpaEntity.getId()))")
    @Mapping(target = "blockChainWallet", expression = "java(BlockChainWallet.of(jpaEntity.getWalletAddress()))")
    User mapToDomainEntity(UserJpaEntity jpaEntity);

    @Mapping(target = "id", expression = "java(domainEntity.getId().getValue())")
    @Mapping(target = "walletAddress", expression = "java(domainEntity.getBlockChainWallet().getAddress())")
    UserJpaEntity mapToJpaEntity(User domainEntity);

    @Mapping(target = "id", expression = "java(null)")
    @Mapping(target = "walletAddress", expression = "java(cmd.getWalletAddress())")
    UserJpaEntity mapToJpaEntity(CreateUserCommand cmd);

}
