package com.sm.movieinfo.common.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CommonPageController {

	
	/**
	 * 설정 팝업
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/setup/settingPopup.do")
	public String commonSettingsPopup(HttpServletRequest request) throws Exception {
		return "setup/settingPopup";
	}
}
