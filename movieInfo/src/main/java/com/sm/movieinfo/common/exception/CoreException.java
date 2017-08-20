package com.sm.movieinfo.common.exception;

import java.text.MessageFormat;
import java.util.Locale;

import org.springframework.context.MessageSource;

public class CoreException extends BaseException {

    private static final long serialVersionUID = 1L;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessageKey() {
        return messageKey;
    }

    public void setMessageKey(String messageKey) {
        this.messageKey = messageKey;
    }

    public Object[] getMessageParameters() {
        return messageParameters;
    }

    public void setMessageParameters(Object[] messageParameters) {
        this.messageParameters = messageParameters;
    }

    public CoreException() {
        this("CoreException without message", null, null);
    }

    public CoreException(String defaultMessage) {
        this(defaultMessage, null, null);
    }

    public CoreException(String defaultMessage, Throwable wrappedException) {
        this(defaultMessage, null, wrappedException);
    }

    public CoreException(String defaultMessage, Object[] messageParameters, Throwable wrappedException) {
        super(wrappedException);

        String userMessage = defaultMessage;
        if (messageParameters != null) {
            userMessage = MessageFormat.format(defaultMessage, messageParameters);
        }
        this.message = userMessage;

    }

    public CoreException(MessageSource messageSource, String messageKey) {
        this(messageSource, messageKey, null, null, Locale.getDefault(), null);
    }

    public CoreException(MessageSource messageSource, String messageKey, Throwable wrappedException) {
        this(messageSource, messageKey, null, null, Locale.getDefault(), wrappedException);
    }

    public CoreException(MessageSource messageSource, String messageKey, Locale locale, Throwable wrappedException) {
        this(messageSource, messageKey, null, null, locale, wrappedException);
    }

    public CoreException(MessageSource messageSource, String messageKey, Object[] messageParameters, Locale locale,
            Throwable wrappedException) {
        this(messageSource, messageKey, messageParameters, null, locale, wrappedException);
    }

    public CoreException(MessageSource messageSource, String messageKey, Object[] messageParameters,
            Throwable wrappedException) {
        this(messageSource, messageKey, messageParameters, null, Locale.getDefault(), wrappedException);
    }

    public CoreException(MessageSource messageSource, String messageKey, Object[] messageParameters,
            String defaultMessage, Throwable wrappedException) {
        this(messageSource, messageKey, messageParameters, defaultMessage, Locale.getDefault(), wrappedException);
    }

    public CoreException(MessageSource messageSource, String messageKey, Object[] messageParameters,
            String defaultMessage, Locale locale, Throwable wrappedException) {
        super(wrappedException);

        this.messageKey = messageKey;
        this.messageParameters = messageParameters;
        this.message = messageSource.getMessage(messageKey, messageParameters, defaultMessage, locale);

    }

}
