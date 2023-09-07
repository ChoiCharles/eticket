package org.oao.eticket.web.adapter.inbound;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.oao.eticket.domain.port.inbound.JoinMembershipCommand;
import org.oao.eticket.domain.port.inbound.JoinMembershipUseCase;
import org.oao.eticket.exception.UserDuplicateException;
import org.oao.eticket.web.common.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequiredArgsConstructor
class JoinMembershipController {

    @Value
    static class JoinMembershipRequestBody {
        @NotBlank @Pattern(regexp = "[a-zA-Z][a-zA-Z0-9]{3,11}")
        String username;
        @NotBlank @Pattern(regexp = "[a-zA-Z0-9]{8,20}")
        String password;
        @NotBlank @Email
        String email;
        @NotBlank
        String nickname;
    }

    record JoinMembershipResponseBody(
            String username,
            String nickname,
            String email,
            String walletAddress,
            String role) {}

    private final JoinMembershipUseCase joinMembershipUseCase;

    @PostMapping(
            value = "/membership/join",
            consumes = "application/json",
            produces = "application/json; charset=utf-8")
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<JoinMembershipResponseBody>
    joinMembership(@Valid @RequestBody JoinMembershipRequestBody payload) throws URISyntaxException {
        try {
            final var user = joinMembershipUseCase.join(new JoinMembershipCommand(
                    payload.getUsername(),
                    payload.getPassword(),
                    payload.getEmail(),
                    payload.getNickname()
            ));

            return ResponseEntity
                    .created(new URI("/users/" + user.getUsername()))
                    .body(new JoinMembershipResponseBody(
                            user.getUsername(),
                            user.getNickname(),
                            user.getEmail(),
                            user.getBlockChainWallet().toString(),
                            user.getRole().toString()
                    ));
        } catch (final UserDuplicateException e) {
            // TODO(meo-s): add description
            throw ApiException.builder()
                    .withCause(e)
                    .withStatus(HttpStatus.CONFLICT)
                    .withSummary("user duplicate")
                    .build();
        }
    }

}
