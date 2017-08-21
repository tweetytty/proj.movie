package com.sm.movieinfo.movie.vo;

import net.sf.json.JSONObject;

public class MovieVO {
	
	Integer movieId;
	String title;
	String openDate;
	String age;
	String duration;
	String genre;
	String director;
	String actor;
	String nation;
	Double grades;
	String story;
	String img;
	Integer ctime;
	
	public MovieVO() {
		this.setMovieId(0);
        this.setTitle("");
        this.setOpenDate("");
        this.setAge("");
        this.setDuration("");
        this.setGenre("");
        this.setDirector("");
        this.setActor("");
        this.setNation("");
        this.setGrades(0.0);
        this.setStory("");
        this.setImg("");
        this.setCtime(-1);
        this.setCtime(0);
    }

	

	public Integer getMovieId() {
		return movieId;
	}



	public void setMovieId(Integer movieId) {
		this.movieId = movieId;
	}



	public String getTitle() {
		return title;
	}



	public void setTitle(String title) {
		this.title = title;
	}



	public String getOpenDate() {
		return openDate;
	}



	public void setOpenDate(String openDate) {
		this.openDate = openDate;
	}



	public String getAge() {
		return age;
	}



	public void setAge(String age) {
		this.age = age;
	}



	public String getDuration() {
		return duration;
	}



	public void setDuration(String duration) {
		this.duration = duration;
	}



	public String getGenre() {
		return genre;
	}



	public void setGenre(String genre) {
		this.genre = genre;
	}



	public String getDirector() {
		return director;
	}



	public void setDirector(String director) {
		this.director = director;
	}



	public String getActor() {
		return actor;
	}



	public void setActor(String actor) {
		this.actor = actor;
	}



	public String getNation() {
		return nation;
	}



	public void setNation(String nation) {
		this.nation = nation;
	}



	public Double getGrades() {
		return grades;
	}



	public void setGrades(Double grades) {
		this.grades = grades;
	}



	public String getStory() {
		return story;
	}



	public void setStory(String story) {
		this.story = story;
	}



	public String getImg() {
		return img;
	}



	public void setImg(String img) {
		this.img = img;
	}



	public Integer getCtime() {
		return ctime;
	}



	public void setCtime(Integer ctime) {
		this.ctime = ctime;
	}
	
}