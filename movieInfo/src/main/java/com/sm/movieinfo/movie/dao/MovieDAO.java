package com.sm.movieinfo.movie.dao;

import java.util.List;

import com.sm.movieinfo.movie.vo.MovieVO;

public interface MovieDAO {

	List<MovieVO> getMovieAll();

	MovieVO getMovie(MovieVO movieVO);

	int insertMovie(MovieVO movieVO);

	int updateMovie(MovieVO movieVO);

	int deleteMovie(MovieVO movieVO);

	int deleteMovieAll();


}
