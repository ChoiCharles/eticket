package org.oao.eticket.web.adapter.inbound;

import org.oao.eticket.web.common.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
class HttpMediaTypeNotSupportedExceptionHandler {
    private static final String MESSAGE = "Content-Type %s is not supported.";

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    ApiErrorResponse catchHttpMediaTypeNotSupportedException(final HttpMediaTypeNotSupportedException e) {
        return ApiErrorResponse.builder()
                .withSummary("http media type not supported")
                .withMessage(String.format(MESSAGE, e.getContentType()))
                .build();
    }
}
