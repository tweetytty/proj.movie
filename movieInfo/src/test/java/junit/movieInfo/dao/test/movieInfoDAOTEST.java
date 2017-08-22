package junit.movieInfo.dao.test;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.sm.movieinfo.movie.dao.MovieDAO;
import com.sm.movieinfo.movie.vo.MovieVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "file:src/main/resources/spring/springContext-datasource.xml"
            })

public class movieInfoDAOTEST {
	
	@Autowired
	private MovieDAO movieDAO;
	
	@Test
	@Transactional
	@Rollback(false)
	public void movieDataTest() throws Exception {
		MovieVO movieVO = new MovieVO();
		movieVO.setTitle("영화이름");
		movieVO.setOpenDate("영화개봉날짜");
		movieVO.setAge("관람나이");
		movieVO.setDuration("관람시간");
		movieVO.setGenre("영화장르");
		movieVO.setDirector("감독");
		movieVO.setActor("출연자");
		movieVO.setNation("국가");
		movieVO.setGrades(10.0d);
		movieVO.setStory("영화내용");
		movieVO.setImg("");
		movieVO.setOrder(0);

		
		int result = movieDAO.insertMovie(movieVO);
		Assert.assertTrue("movieVO insert", result > 0);
		
		List<MovieVO> movieList = movieDAO.getMovieAll(movieVO);
		Assert.assertTrue("movieVO selectAll", movieList.size() > 0);
		
		result = movieDAO.deleteMovie(movieVO);
		Assert.assertTrue("movieVO delete", result > 0);
	}
	

}
