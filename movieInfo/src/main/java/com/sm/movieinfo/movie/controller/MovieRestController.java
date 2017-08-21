package com.sm.movieinfo.movie.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sm.movieinfo.common.vo.JsonVO;
import com.sm.movieinfo.movie.service.MovieService;
import com.sm.movieinfo.movie.vo.MovieVO;
import com.sm.movieinfo.util.common.JsonCode;

@Controller
public class MovieRestController {
    private static final Logger logger = LoggerFactory.getLogger(MovieRestController.class);
    
    @Resource private MovieService movieService;
      
    
    @RequestMapping(value = "/movieAll/{order}", method = RequestMethod.GET,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO getMovieAll(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, HttpServletRequest request, @PathVariable int order) throws Exception {
        logger.info("getMovieAll Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        List<MovieVO> movieList = new ArrayList<MovieVO>();
        MovieVO param = new MovieVO();
        param.setOrder(order);
        movieList = movieService.getMovieAll(param);
        
        jsonVO.setData("list", movieList);
        return jsonVO;
    }
    
    @RequestMapping(value = "/movieAll", method = RequestMethod.DELETE,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO deleteMovieAll(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, HttpServletRequest request) throws Exception {
        logger.info("deleteMovieAll Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        int result = movieService.deleteMovieAll();
        
        jsonVO.setData("result", result);
        return jsonVO;
    }
    
    @RequestMapping(value = "/movie", method = RequestMethod.GET,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO getMovie(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, @RequestBody MovieVO vo) throws Exception {
        logger.info("getMovie Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        MovieVO result = new MovieVO();
        result = movieService.getMovie(vo);
        
        jsonVO.setData("result", result);
        return jsonVO;
    }
    
    @RequestMapping(value = "/movie", method = RequestMethod.POST,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO insertMovie(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, @RequestBody MovieVO vo) throws Exception {
        logger.info("insertMovie Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        int result = movieService.insertMovie(vo);
        
        jsonVO.setData("result", result);
        return jsonVO;
    }
    
    @RequestMapping(value = "/movie", method = RequestMethod.PUT,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO updateMovie(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, @RequestBody MovieVO vo) throws Exception {
        logger.info("updateMovie Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        int result = movieService.updateMovie(vo);
        
        jsonVO.setData("result", result);
        return jsonVO;
    }
    
    @RequestMapping(value = "/movie", method = RequestMethod.DELETE,  headers=JsonCode.STRING_HEADER_ACCEPT_APPLICATION_JSON)
    public @ResponseBody JsonVO deleteMovie(@RequestHeader(JsonCode.STRING_HEADER_VERSION) String restVersion, @RequestBody MovieVO vo) throws Exception {
        logger.info("deleteMovie Controller");
 
        JsonVO jsonVO = new JsonVO(restVersion,JsonCode.RESCODE_SUCCESS);
        int result = movieService.deleteMovie(vo);
        
        jsonVO.setData("result", result);
        return jsonVO;
    }

}
