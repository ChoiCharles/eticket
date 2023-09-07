package org.oao.eticket.persistence.adapter.outbound;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.oao.eticket.domain.application.model.UserRole;

@Converter
class UserRoleConverter implements AttributeConverter<UserRole, String> {

    @Override
    public String convertToDatabaseColumn(final UserRole attr) {
        return attr.getRoleName();
    }

    @Override
    public UserRole convertToEntityAttribute(final String attr) {
        return UserRole.of(attr);
    }

}
