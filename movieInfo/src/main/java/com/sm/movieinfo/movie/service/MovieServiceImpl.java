package com.sm.movieinfo.movie.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sm.movieinfo.movie.dao.MovieDAO;
import com.sm.movieinfo.movie.vo.MovieVO;

@Service
public class MovieServiceImpl implements MovieService {
	
	@Resource private MovieDAO movieDAO;
    
    private static final Logger logger = LoggerFactory.getLogger(MovieServiceImpl.class);

	@Override
	public List<MovieVO> getMovieAll(MovieVO movieVO) throws Exception {
		return movieDAO.getMovieAll(movieVO);
	}

	@Override
	public MovieVO getMovie(MovieVO movieVO) {
		return movieDAO.getMovie(movieVO);
	}

	@Override
	public int insertMovie(MovieVO movieVO) {
		return movieDAO.insertMovie(movieVO);
	}

	@Override
	public int updateMovie(MovieVO movieVO) {
		return movieDAO.updateMovie(movieVO);
	}

	@Override
	public int deleteMovie(MovieVO movieVO) {
		return movieDAO.deleteMovie(movieVO);
	}

	@Override
	public int deleteMovieAll() throws Exception {
		return movieDAO.deleteMovieAll();
	}
   

}
