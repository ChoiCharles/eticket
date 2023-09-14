package org.oao.eticket.adapter.in.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.GetPerformanceDetailUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@WebAdapter
@RequiredArgsConstructor
public class GetPerformanceDetailController {
    record GetPerformanceDetailResponseBody() {

    }

    private final GetPerformanceDetailUseCase getPerformanceDetailUseCase;

    // TODO(yoo) : @Operation SWAGGER
    @GetMapping(
            value = "/performances/{performanceId}",
            produces = "application/json; charset=utf-8"
    )
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<GetPerformanceDetailResponseBody> getPerformanceDetail(@Valid @PathVariable("performanceId") Integer payload) {
        //TODO (yoo) : body type
        try {
            final var performance =
                    getPerformanceDetailUseCase.getPerformance(payload);
            return ResponseEntity.ok(new GetPerformanceDetailResponseBody());

        } catch (final Exception e) {
            // TODO (yoo) : exception handling
            throw e;
        }

    }
}
