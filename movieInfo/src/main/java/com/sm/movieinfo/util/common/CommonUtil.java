package com.sm.movieinfo.util.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class CommonUtil {
    
    public static final int getSessionTimeout() {
        return getSession().getMaxInactiveInterval();
    }
    
    public static final String getSessionId() {
        return getSession().getId();
    }

    public static final HttpServletRequest getCurrentRequest() {
    return currentRequestAttributes().getRequest();
    }

    private static final HttpSession getSession() {
        return currentRequestAttributes().getRequest().getSession();
    }

    private static ServletRequestAttributes currentRequestAttributes() {
        RequestAttributes requestAttr = RequestContextHolder.currentRequestAttributes();
        if (!(requestAttr instanceof ServletRequestAttributes)) {
            throw new IllegalStateException("Current request is not a servlet request");
        }
        return (ServletRequestAttributes) requestAttr;
    }

}
