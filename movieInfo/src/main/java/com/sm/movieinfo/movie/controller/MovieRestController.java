package com.sm.movieinfo.movie.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sm.movieinfo.common.vo.JsonVO;
import com.sm.movieinfo.movie.service.MovieService;
import com.sm.movieinfo.movie.vo.MovieVO;
import com.sm.movieinfo.util.common.JsonCode;

@Controller
public class MovieRestController {
    private static final Logger logger = LoggerFactory.getLogger(MovieRestController.class);
    
    @Resource private MovieService movieService;
      
    
    @RequestMapping(value = "/movielist", method = RequestMethod.GET,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO movielist(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, HttpServletRequest request) throws ServletException, IOException, Exception {
        logger.info("movielist Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        List<MovieVO> movieList = new ArrayList<MovieVO>();
        movieList = movieService.getMovieList();
        
        jsonVO.setData("list", movieList);
        return jsonVO;
    }
    
    @RequestMapping(value = "/movie", method = RequestMethod.GET,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO getMovie(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, HttpServletRequest request, MovieVO vo) throws ServletException, IOException, Exception {
        logger.info("getMovie Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        MovieVO result = new MovieVO();
        result = movieService.getMovie(vo);
        
        jsonVO.setData("result", result);
        return jsonVO;
    }
    
    @RequestMapping(value = "/movie", method = RequestMethod.PUT,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO putMovie(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, HttpServletRequest request, MovieVO vo) throws ServletException, IOException, Exception {
        logger.info("getMovie Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        int result = movieService.updateMovie(vo);
        
        jsonVO.setData("result", result);
        return jsonVO;
    }
    
    @RequestMapping(value = "/movie", method = RequestMethod.DELETE,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO deleteMovie(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, HttpServletRequest request, MovieVO vo) throws ServletException, IOException, Exception {
        logger.info("getMovie Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        int result = movieService.deleteMovie(vo);
        
        jsonVO.setData("result", result);
        return jsonVO;
    }

}
