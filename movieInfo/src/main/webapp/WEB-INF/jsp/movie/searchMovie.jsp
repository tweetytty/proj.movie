<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>

<div id="searchMovie">
	<header id="header">
		<div class="logo">
			<h1 id="myLogo" sytle="cursor: default;">My Movies</h1>
		</div>
	</header>
	<section>
		<div class="side_bar">
			<div class="side_top">
<!-- 				<div btnCommonUiMenu="previous" class="side_top_previous"><span class="cursor_p" title="이전"></span></div>  -->
				<div btnCommonUiMenu="home" class="side_top_home"><span class="cursor_p" title="메인화면"></span></div>
			</div>
			<div class="side_mid2">
				<h1>Search a movie</h1>
				<h3>Please search movie.</h3>
			</div>
			<div class="side_bottom2">
				<nav>
					<ul>
						<li>
							<div btnCommonUiMenu="bookmark" class="cursor_p" ">
								<span>북마크</span>
								<img src="images/common/navi_arrow_normal.png"/>
							</div>
							<div btnCommonUiMenu="reset" class="cursor_p" ">
								<span>초기화</span>
								<img src="images/common/navi_arrow_normal.png"/>
							</div>
							<br>
						</li>
					</ul>
				</nav>
			</div>
		</div>
		<div class="topContainer">
			<div id="divSearchMovie">
				<br><h1>Please search movie.</h1><br>
				<div class="next_content">
				<input type="text" id="searchMovieTitle" />
					<span class="button_text cursor_p" id="searchMovieButton" title="검색">검색</span>
				</div>
			</div>
			<div id="divOrderMovie" style="display:none;">
				<br><h1>[ Bookmark ]</h1><br>
				<div class="select_bookmakr_order">
					<select id="orderBookmark">
						 <option value="0" selected>최신 등록 순</option>
						 <option value="1">오래 된 등록 순</option>
						 <option value="2">평점 높은 순</option>
						 <option value="3">평점 낮은 순</option>
						 <option value="4">제목 내림차순</option>
						 <option value="5">제목 오름차순</option>
					</select>
				</div>
			</div>
			<div id="mainContainer">
			</div>
		</div>
	</section>
</div>
