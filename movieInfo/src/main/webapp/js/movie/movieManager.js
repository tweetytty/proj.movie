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

});

var MovieManager = {
		
		displayMovieInfo : function(items){
			var br = "<br>";
			var html = "<h1> [ " + items.q + " ] 검색 결과 (" + items.totalCount + ")</h1>" + br;
			var failImg = '/movieInfo/images/common/noImage_228_128.png';
			
			if(items.totalCount == 0){
				html += "<div>";
				html += "	<h2> 검색 결과가 없습니다.<h2>" + br;
				html += "</div>";
			}else{
				$(items.item).each(function(i, item){
					html += "<div style='float: left;clear: both;'>";
					html += "	<div style='display:inline-block; float: left; width:250px;'>";
					html += "		<img src=" + (item.thumbnail[0].content == undefined || item.thumbnail[0].content == "" ? failImg : item.thumbnail[0].content) + " style='width:200px; height:300px;'/>";
					html += "	</div>";
					html += "	<div style='display: inline-block; float:right; width:calc(100% - 300px);padding: 0 50px 0 0;'>";
					html += "		제목 :" + item.title[0].content + br;
					var openInfo = "";
					$(item.open_info).each(function(j, info){
						if(info.content != ''){
							openInfo += info.content;
							if(j != item.open_info.length-1)
								openInfo += ", ";
						}
					})
					html += "		 개봉정보 :" + openInfo  + br;
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
					html += "		 제작국가 :" + item.nation [0].content + br;
					html += "		 평점 :" + item.grades [0].content + br;
					html += "		 장르 :" + item.genre[0].content + br + br;
					html += "		 줄거라 :" + item.story[0].content + br;
					html += "	</div>";
					html += "</div>" + br;
				});
			}
			
			$("#divTemplate").html(html);
		},
		
		
		/*
		 * bind bookmark event
		 */
		fnListEventBind : function() {
			
		}
};
