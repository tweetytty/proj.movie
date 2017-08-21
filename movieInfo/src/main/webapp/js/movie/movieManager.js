$(document).ready(function(){
	
	/**
	 * 영화이름 검색
	 */
	$('#searchMovieButton').unbind('click').click(function() {
		var searchTitle = $("#searchMovieTitle").val();

		if(searchTitle == '')
			comm.alert("검색어를 입력하세요.");
		else{
			ServerRequest.goSearchMovie(searchTitle);
		}
	});
	
	$("#searchMovieTitle").keyup(function(e){
		if(e.keyCode == 13){
			var searchTitle = $("#searchMovieTitle").val();

			if(searchTitle == '')
				comm.alert("검색어를 입력하세요.");
			else{
				ServerRequest.goSearchMovie(searchTitle);
			}
		}
	});
	
	/**
	 * bookmark ordering
	 */
	$('#orderBookmark').change(function(e) {
		var selectOrder = $(e.currentTarget).find(':selected').val(); 
		ServerRequest.getUserBookMark(selectOrder);
	});
	
	// 사용자 북마크 로드
	MovieManager.getUserBookMark();

});

var MovieManager = {
		
		displayMovieInfo : function(items){
			$("#divSearchMovie").show();
			$("#divOrderMovie").hide();
			
			var br = "<br>";
			var html = "<h1> [ " + items.q + " ] 검색 결과 (" + items.totalCount + ")</h1>" + br;
			var failImg = '/movieInfo/images/common/noImage_228_128.png';
			
			if(items.totalCount == 0){
				html += "<div>";
				html += "	<h2> 검색 결과가 없습니다.<h2>" + br;
				html += "</div>";
			}else{
				$(items.item).each(function(idx, item){
					var openInfo = [];
					
					var isSaved = false;	
					$.each(userBookMark, function(i) {
					    $.each(userBookMark[i], function(key, movie) {
					    	if(movie.title == item.title[0].content && movie.director == item.director[0].content ){
								isSaved = true;
								return false;
							}
					    });
					});
					html += "<div style='float: left;clear: both;'>";
					html += '	<div class="bookmark_checkbox">';
					html += '		<input id="movieListCheck_' +  idx  +'" class="checkBookmark" type="checkbox" ' + (isSaved == true ? 'checked' : '')   + '>';
					html += '		<label for="movieListCheck_' + idx  +  '">북마크</label>';
					html += '	</div>';
					html += "	<div style='display:inline-block; float: left; width:250px;'>";
					html += "		<img src=" + (item.thumbnail[0].content == undefined || item.thumbnail[0].content == "" ? failImg : item.thumbnail[0].content) + " style='width:200px; height:300px;'/>";
					html += "	</div>";
					html += "	<div style='display: inline-block; float:right; width:800px;padding: 0 50px 0 0;'>";
					html += "		제목 :" + item.title[0].content + br;
					openInfo[3]='';
					
					$(item.open_info).each(function(j, info){
						if(info.content != ''){
							if(info.content.indexOf('.') > -1)
								openInfo[0] = info.content;
							else if(info.content.indexOf('분') > -1)
								openInfo[1] = info.content;
							else
								openInfo[2] = info.content;
						}
					})
					
					$(openInfo).each(function(j, info){
						if(info == undefined)
							openInfo[j] = '';
					})
					
					html += "		 개봉날짜 :" + openInfo[0]  + br;
					html += "		 상영시간 :" + openInfo[1]  + br;
					html += "		 관람연령 :" + openInfo[2]  + br;
					html += "		 장르 :" + item.genre[0].content  + br;
					html += "		 감독 :" + item.director[0].content  + br;
					var actors = "";
					$(item.actor).each(function(j, actor){
						if(actor.content != ''){
							actors += actor.content;
							if(j != item.actor.length-1)
								actors += ", ";
						}
					})
					html += "		 출연배우 :" + actors  + br;
					html += "		 제작국가 :" + item.nation[0].content + br;
					html += "		 평점 :" + item.grades[0].content + br;
					html += "		 줄거라 :" + item.story[0].content + br;
					html += "	</div>";
					html += "	<input type='hidden' class='selectMovieInfo' img='" + item.thumbnail[0].content
																		+ "' title='" + item.title[0].content  
																		+ "' openDate='" + openInfo[0]
																		+ "' duration='" + openInfo[1]
																		+ "' age='" + openInfo[2]
																		+ "' genre='" + item.genre[0].content 
																		+ "' director='" + item.director[0].content 
																		+ "' actor='" + actors 
																		+ "' nation='" + item.nation[0].content 
																		+ "' grades='" + item.grades[0].content 
																		+ "' story='" + item.story[0].content 
																		+ "'>";
					html += "</div>" + br;
				});
			}
			
			$("#mainContainer").html(html);
			this.fnListEventBind();
		},
		
		
		/*
		 * bind bookmark event
		 */
		fnListEventBind : function() {
			
			/**
			 * bookmark 아이콘 클릭 이벤트
			 */
			$(".checkBookmark").unbind('click').click(function() {
				var isCheck = false;
				if($(this).is(':checked'))
					isCheck = true;
				
				ServerRequest.goUpdateBookmark($(this).parent().parent().find('.selectMovieInfo'), isCheck);
			});
		},
		
		getUserBookMark : function(){
			if(userBookMark == '')
				ServerRequest.getUserBookMark();
		},
		
		deleteBookmarkAll : function(){	
			comm.confirm("북마크를 초기화 하시겠습니까?",  function(){
				ServerRequest.deleteBookmarkAll()}, null);	
		},
		
		goBookmark : function(){
			$("#divSearchMovie").hide();
			$("#divOrderMovie").show();
			
			var br = "<br>";
			var html = "";
			var failImg = '/movieInfo/images/common/noImage_228_128.png';
			
			if(userBookMark == ''){
				html += "<div>";
				html += "	<h2> 저장 된 영화정보가 없습니다.<h2>" + br;
				html += "</div>";
			}else{
				html += "<div>";
				html += "	<h2> 총 " + userBookMark.list.length + " 편 <h2>" + br;
				html += "</div>";
				$.each(userBookMark, function(idx) {
					$.each(userBookMark[idx], function(key, movie) {
	
						html += "<div style='float: left;clear: both;'>";
						html += '	<div class="bookmark_checkbox">';
						html += '		<input id="movieListCheck_' +  idx  +'" class="checkBookmark" type="checkbox" checked >';
						html += '		<label for="movieListCheck_' + idx  +  '">북마크</label>';
						html += '	</div>';
						html += "	<div style='display:inline-block; float: left; width:250px;'>";
						html += "		<img src=" + (movie.img == undefined || movie.img == "" ? failImg : movie.img) + " style='width:200px; height:300px;'/>";
						html += "	</div>";
						html += "	<div style='display: inline-block; float:right; width:800px;padding: 0 50px 0 0;'>";
						html += "		제목 :" + movie.title + br;
						html += "		 개봉날짜 :" + movie.openDate  + br;
						html += "		 상영시간 :" + movie.duration  + br;
						html += "		 관람연령 :" + movie.age  + br;
						html += "		 장르 :" + movie.genre  + br;
						html += "		 감독 :" + movie.director  + br;
						html += "		 출연배우 :" + movie.actor  + br;
						html += "		 제작국가 :" + movie.nation + br;
						html += "		 평점 :" + movie.grades + br;
						html += "		 줄거라 :" + movie.story + br;
						html += "	</div>";
						html += "	<input type='hidden' class='selectMovieInfo' img='" + movie.img
																			+ "' title='" + movie.title 
																			+ "' openDate='" + movie.openDate
																			+ "' duration='" + movie.duration
																			+ "' age='" + movie.age
																			+ "' genre='" + movie.genre
																			+ "' director='" + movie.director
																			+ "' actor='" + movie.actor 
																			+ "' nation='" + movie.nation
																			+ "' grades='" + movie.grades 
																			+ "' story='" + movie.story 
																			+ "'>";
						html += "</div>" + br;
					});
				});
			}
			
			$("#mainContainer").html(html);
			this.fnListEventBind();
		}
		
};
