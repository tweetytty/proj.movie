var ServerRequest = {  
	SERVLET_HTTP_PATH : "/movieInfo/",
	DAUM_API_APIKEY : "8c2f9872be5b3dfaa08c8b23413dabc3",
	DAUM_API_MOVIE : "https://apis.daum.net/contents/movie?result=15&output=json",
	
	goSearchMovie : function(searchTitle){
		var urlPath = this.DAUM_API_MOVIE + "&apikey=" + this.DAUM_API_APIKEY + "&q=" + searchTitle + "&pageno=1";
		
		comm.rest(urlPath, 'GET', null, function(json) {
			var items = json.channel;
			MovieManager.displayMovieInfo(items);
		}, null, null, null, false, 'jsonp', 'application/json');
		
	}

};