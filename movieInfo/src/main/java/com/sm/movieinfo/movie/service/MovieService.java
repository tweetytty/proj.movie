package com.sm.movieinfo.movie.service;

import java.util.List;

import com.sm.movieinfo.movie.vo.MovieVO;

public interface MovieService {

    List<MovieVO> getMovieList() throws Exception;
    MovieVO getMovie(MovieVO movieVO);
    int insertMovie(MovieVO movieVO);
    int updateMovie(MovieVO movieVO);
    int deleteMovie(MovieVO movieVO);
    
}
