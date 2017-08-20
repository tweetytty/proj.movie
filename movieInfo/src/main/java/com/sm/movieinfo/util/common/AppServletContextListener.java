package com.sm.movieinfo.util.common;

import java.io.File;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class AppServletContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        String catalinaHome = System.getProperty("catalina.home");
        int idx = catalinaHome.lastIndexOf(File.separator);
        
        String installedPath = catalinaHome.substring(0, idx);
        
        System.setProperty("supersignvwe.home", installedPath);
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        
    }

}
