package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.port.out.SaveAuthTokenMetadataCommand;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
interface AccessTokenMetadataMapper {
  @Mapping(target = "signature", source = "accessTokenMetadata.signature")
  AccessTokenMetadataRedisEntity mapToRedisEntity(SaveAuthTokenMetadataCommand cmd);
}
