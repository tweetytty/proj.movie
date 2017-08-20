package com.sm.movieinfo.util.common;

import org.springframework.context.ApplicationContext;

public class AppContext {
    private static ApplicationContext context;
    
    public static void setApplicationContext(ApplicationContext applicationContext) {
        context = applicationContext;
    }
    
    public static ApplicationContext getApplicationContext() {
        return context;
    }
    
    public static Object getBean(String serviceName){
        return context.getBean(serviceName);
    }
}
