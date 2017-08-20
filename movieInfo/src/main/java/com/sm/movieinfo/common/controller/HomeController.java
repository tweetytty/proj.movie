package com.sm.movieinfo.common.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@RequestMapping(value = "/index.do", method = RequestMethod.GET)
    public String index(HttpServletRequest request, Model model) throws Exception {
	    return "main";
	}
}
