package com.sm.movieinfo.movie.vo;

import net.sf.json.JSONObject;

public class MovieVO {
	
	private Integer movieId;
	private String title;
	private String openDate;
	private String age;
	private String duration;
	private String genre;
	private String director;
	private String actor;
	private String nation;
	private Integer grades;
	private String story;
	private String img;
	private Integer ctime;
	
	public MovieVO() {
        this.setTitle("");
        this.setOpenDate("");
        this.setAge("");
        this.setDuration("");
        this.setGenre("");
        this.setDirector("");
        this.setActor("");
        this.setNation("");
        this.setGrades(10);
        this.setStory("");
        this.setImg("");
        this.setCtime(-1);
    }


	public Integer getMovieId() {
		return movieId;
	}


	public void setMovieId(Integer movieId) {
		this.movieId = movieId;
	}


	public Integer getCtime() {
		return ctime;
	}




	public void setCtime(Integer ctime) {
		this.ctime = ctime;
	}




	public String getImg() {
		return img;
	}




	public void setImg(String img) {
		this.img = img;
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




	public Integer getGrades() {
		return grades;
	}




	public void setGrades(Integer grades) {
		this.grades = grades;
	}




	public String getStory() {
		return story;
	}




	public void setStory(String story) {
		this.story = story;
	}




	public String toString() {
        JSONObject jsonObj = JSONObject.fromObject(this);
        return jsonObj.toString();
    }
	
}