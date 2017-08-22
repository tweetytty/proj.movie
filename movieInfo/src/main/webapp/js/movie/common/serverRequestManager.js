var ServerRequest = {  
	SERVLET_HTTP_PATH : "/movieInfo",
	DAUM_API_APIKEY : "892f6a0ff9729a02cad50674b4cf1f6d",
	DAUM_API_MOVIE : "https://apis.daum.net/contents/movie?result=15&output=json",
	
	goSearchMovie : function(searchTitle){
		var urlPath = this.DAUM_API_MOVIE + "&apikey=" + this.DAUM_API_APIKEY + "&q=" + searchTitle + "&pageno=1";
		
		comm.rest(urlPath, 'GET', null, function(json) {
			var items = json.channel;
			MovieManager.displayMovieInfo(items);
		}, null, null, null, false, 'jsonp', 'application/json');
		
	},
	
	goUpdateBookmark : function(movieInfo, isCheck){
    	var urlPath = commCtxPath + "/rest/movie";
    	var method = 'DELETE';
    	if(isCheck)
    		method = 'POST';
    	
		comm.rest(urlPath, method, JSON.stringify({
				img : movieInfo.attr('img'),
				title : movieInfo.attr('title'),
				openDate : movieInfo.attr('openDate'),
				duration : movieInfo.attr('duration'),
				age : movieInfo.attr('age'),
				genre : movieInfo.attr('genre'),
				director : movieInfo.attr('director'),
				actor : movieInfo.attr('actor'),
				nation : movieInfo.attr('nation'),
				grades : movieInfo.attr('grades'),
				story : movieInfo.attr('story')	}), function(json) {
			var result = json.resCode;
			if(result == RESCODE_SUCCESS){
				ServerRequest.getUserBookMark();
				
				var currentPage = 'search';
				if($("#divSearchMovie").css('display') == 'none')
					currentPage = 'bookmark';
				
				if(isCheck){
					comm.alert('북마크 등록이 완료되었습니다.');
				}else{
					if(currentPage == 'search'){
						comm.alert('북마크 삭제가 완료되었습니다.');
					}else{
						comm.alert('북마크 삭제가 완료되었습니다.', function(){
							MovieManager.goBookmark();
						});
					}
				}
				
			}else{
				console.log("- db insert error: " + json.resMsgDev);
				if(isCheck){
					comm.alert('북마크 등록이 살패하였습니다.');
				}else{
					comm.alert('북마크 삭제가 실패하였습니다.');
				}
			}
		}, null, null, null, false, 'json', 'application/json');
    	
		
	},
	
	
	getUserBookMark : function(order){
		var orderType = 0;
    	if(order == undefined)
    		orderType = 0;
    	else
    		orderType = order;
    	
    	var urlPath = commCtxPath + "/rest/movieAll/" + orderType;
    	
		comm.rest(urlPath, 'GET', null, function(json) {
			var result = json.resCode;
			if(result == RESCODE_SUCCESS){
				if(json.data.list.length == 0)
					userBookMark = '';
				else
					userBookMark = json.data;
				
				if(order != undefined)
					MovieManager.goBookmark();
				
			}else{
				console.log("- getMovieList error: " + json.resMsgDev);
			}
		}, null, null, null, false, 'json', 'application/json');
		
	},
	
	deleteBookmarkAll : function(){
		var urlPath = commCtxPath + "/rest/movieAll";
    	
		comm.rest(urlPath, 'DELETE', null, function(json) {
			var result = json.resCode;
			if(result == RESCODE_SUCCESS){
				comm.alert('북마크 초기화가 완료되었습니다.', function(){
					window.location.reload();
				});
			}else{
				comm.alert('북마크 초기화에 실패하였습니다.');
			}
		}, null, null, null, false, 'json', 'application/json');
		
	}

};