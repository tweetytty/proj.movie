/**************************************************************
 * 								공통 변수
 **************************************************************/
var JSON 			= JSON || {};
var debugMode		= true;	//	디버그 테스트용 변수 : true 일때만 출력함
var withCredentialsMode		= true;	//	디버그 테스트용 변수 : true 일때만 CORS 호출
var commApiIp		= "";
var commUserDateFormat;
var commUserDateFormatString;
var commUserTimeFormat;
var commCtxPath		= "<c:out value='/movieInfo'/>";

var _loadingModalObjext;
var _loadingImageTimer;

var RESCODE_SUCCESS = "1";
var RESCODE_FAIL = "01000";
var RESCODE_FAIL_INVALID_LICENSE = "01010";
var RESCODE_FAIL_EXPIRED_LICENSE = "01020";
var RESCODE_FAIL_HEADER = "02000";
var RESCODE_FAIL_PARAM = "02010";
var RESCODE_NO_PERMISSION = "02030";
var RESCODE_FAIL_FN_UNAUTHORIZED = "02040";
var RESCODE_FAIL_SERVER_SIDE = "07000";
var RESCODE_FAIL_RESPONSE_CONVERSION_ERROR = "07000";
var RESCODE_FAIL_ALERT_TO_CLIENT = "08000";
var RESCODE_FAIL_FORWARD = "08100";
var RESCODE_FAIL_UNAUTHORIZED = "09401";
var DATA_COLUM_NAME_RESCODE = "resCode";
var DATA_COLUM_NAME_RESMSG = "resMsg";
var DATA_COLUM_NAME_RESMSGDEV = "resMsgDev";
var DATA_COLUM_NAME_RESUUID = "resUuid";
var DATA_COLUM_NAME_RESVERSION = "resVersion";
var DATA_COLUM_NAME_DATA = "data";
var STRING_HEADER_VERSION = "Rest-Version";
var STRING_HEADER_CLIENT_TYPE = "Client-Type";
var STRING_HEADER_ACCEPT = "Accept";
var STRING_HEADER_ACCEPT_APPLICATION_JSON = "Accept=application/json";

/**************************************************************
 * 								공통 객체
 **************************************************************/
var comm	= {
		
		/**
		 * 레이어 경고 화면 기초창
		 * 반환값 bpopup 객체
		 * @param param
		 */
		layerAlert : function( param ){
			
			var label_common_ok	= "확인";
			var label_common_cancel	= "취소";
			
			var rVal 	= Math.floor(Math.random() * 10000 ) + 1 ;// 1~10000 사이의 임의 값
			var divId	= "divAlert_"+rVal;
			var br		= "\n";
			var htmlStr = "";

			if(!param){
				param = {
					titleView : true//Title Line 표시 여부
					,	title	: ''	//타이틀 표시 화면
					,	imgType : ''	//값이 있을 경우 이미지 보여줌[info,alert]
					,	msg		: ''	//화면에 표시될 메세지
					,	btnCnt  : 1		//버튼의 갯수 1,2 
					,	btnText : [label_common_ok] //버튼에 들어갈 텍스트 배열
					,	btnFn	: [function(){}] //버튼에 들어갈 이벤트
					,	onLoadFn : function(){} //화면이 로드후 이벤트 바인딩 작업
					,	closeIconFn : function(){} //화면의 x 아이콘을 통해 닫을때 이벤트
				};
			}

			if(!param.titleView) 	param.titleView = true;
			if(!param.title) 		param.title = '';
			if(!param.imgType) 		param.imgType = '';
			if(!param.msg) 			param.msg = '';
			if(!param.btnCnt) 		param.btnCnt = 1;
			if(!param.btnText) 		param.btnText = [label_common_ok];
			if(!param.btnFn) 		param.btnFn = [function(){}];
			if(!param.onLoadFn) 	param.onLoadFn = function(){};

			//값 점검
			if( param.btnCnt <= 0 || param.btnCnt > 2){
				//alert('버튼은 1~2 : '+param.btnCnt);
				return;
			}

			if( param.btnCnt != param.btnText.length || param.btnCnt != param.btnFn.length ){
				//alert('버튼 수량 오류 : '+param.btnCnt+"EA / 라벨:"+param.btnText.length+" / 이벤트:"+param.btnFn.length);
				return;
			}

			if( typeof param.titleView != "boolean" ){
				param.titleView = true;	
			}

			if( param.imgType.toLowerCase() != 'info' &&  param.imgType.toLowerCase() != 'alert' ){
				param.imgType = '';
			}else{
				param.imgType = param.imgType.toLowerCase();
			}

			var imgSrc	= "";
			if( param.imgType.toLowerCase() == 'info' ){
				imgSrc	= commCtxPath+"/images/common/icon_info2.png";
			}else if( param.imgType.toLowerCase() == 'alert' ){
				imgSrc	= commCtxPath+"/images/common/icon_alert.png";
			}

			var focusDummy = "<input type='text' id='"+divId+"_dummyfocus' class='dummyfocus' style='display:block;display:block;background-color: #c4c5c8;width: 1px;height: 1px;'>"; //hidden포커스 안가는 문제점 있음

			// [본문 만들기] /////
			htmlStr = htmlStr + "<div id='"+divId+"' style='display:none;'>" + br;
			htmlStr = htmlStr + "	<div class='alertbox'>" + br;

			//타이틀 존재 여부
			if( param.titleView ){
				htmlStr = htmlStr + "		<ul>" + br;
				htmlStr = htmlStr + "			<li class='title_alert'>"+param.title+"</li>" + br;
				htmlStr = htmlStr + "			<li class='btn_alert'><div class='btn_alert_close fnClose'><a class='fnBtnClose' onmousedown='return false;'></a></div></li>" + br;
				htmlStr = htmlStr + "		</ul>" + br;
			}

			htmlStr = htmlStr + "		<ul>" + br;
			htmlStr = htmlStr + "			<li class='box_popup'>" + br;
			htmlStr = htmlStr + "				<ul>" + br;

			if( $.trim(param.imgType) != '' ){
				//이미지 방식
				htmlStr = htmlStr + "					<li class='info_alert_icon tdcenter'>" + br;
				htmlStr = htmlStr + "						<img src='"+imgSrc+"'><br>"+ param.msg + br;
				htmlStr = htmlStr + "					</li>" + br;
			}else{
				//텍스트 방식
				htmlStr = htmlStr + "					<li class='info_alert_text tdcenter'>" + br;
				htmlStr = htmlStr + "						<div>"+ param.msg +"</div>" + br;
				htmlStr = htmlStr + "					</li>" + br;			
			}
			htmlStr = htmlStr + "				</ul>" + br;

			if( param.btnCnt == 2 ){
				htmlStr = htmlStr + "				<!-- 다중 버튼 -->" + br;
				htmlStr = htmlStr + "				<ul class='btn_bottom'>" + br;
				htmlStr = htmlStr + "					<li class='btn_left'>" + br;
				htmlStr = htmlStr + "						<div class='button_pop fnClose fnBtn1'>" + br;
				htmlStr = htmlStr + "							<a>"+ param.btnText[1] +"</a>" + br;
				htmlStr = htmlStr + "						</div>" + br;
				htmlStr = htmlStr + "					</li>" + br;
				htmlStr = htmlStr + "					<li class='btn_right'>" + br;
				htmlStr = htmlStr + "						<div class='button_pop fnClose fnBtn0'>" + br;
				htmlStr = htmlStr + "							<a>"+ param.btnText[0] +"</a>" + br;
				htmlStr = htmlStr + "						</div>" + br;
				htmlStr = htmlStr + "					</li>" + br;
				htmlStr = htmlStr + "				</ul>" + br;

			}else{
				htmlStr = htmlStr + "				<!-- 단일 버튼 -->" + br;
				htmlStr = htmlStr + "				<ul class='btn_bottom'>" + br;
				htmlStr = htmlStr + "					<li class='btn_center_only'>" + br;
				htmlStr = htmlStr + "						<div class='button_pop fnClose fnBtn0'><a>"+ param.btnText[0] +"</a></div>" + br;
				htmlStr = htmlStr + "					</li>" + br;
				htmlStr = htmlStr + "				</ul>" + br;

			}		
			htmlStr = htmlStr + "			</li>" + br;
			htmlStr = htmlStr + "		</ul>" + br;
			
			//focus를 옮긴후 태그는 제거됨
			htmlStr = htmlStr + "	<div id='"+divId+"_dummyfocusDiv' style='position: absolute;top: -3000px;left: -3000px;'>" + br;
			htmlStr = htmlStr + focusDummy + br;
			htmlStr = htmlStr + "	</div>" + br;

			htmlStr = htmlStr + "	</div>" + br;
			htmlStr = htmlStr + "" + br;
			htmlStr = htmlStr + "</div>" + br;

			var $divAlert	= $(htmlStr);
			$divAlert.appendTo('body');	

			var bpoupObject = $('#'+divId).bPopup({
				modalClose: false, //배경클릭으로 닫힘 방지
				closeClass : 'fnClose',
				onClose : function(){
					if( typeof callback =="function" ){
						callback();
					}
					$('#'+divId).remove();
				},
				zIndex : comm.getHighestZIndex()
			},
			
			function(){
				//화면이 로드후 이벤트 바인딩 작업
				//debugger;

				if( param.btnCnt == 1 ){
					$('#'+divId+" .fnBtn0").click(function(){
						if( typeof param.btnFn[0] =="function" ){
							param.btnFn[0]();
						}
					});	

				}else if( param.btnCnt == 2 ){
					$('#'+divId+" .fnBtn0").click(function(){
						if( typeof param.btnFn[0] =="function" ){
							param.btnFn[0]();
						}
					});	
					$('#'+divId+" .fnBtn1").click(function(){
						if( typeof param.btnFn[1] =="function" ){
							param.btnFn[1]();
						}
					});		
				}
				
				//닫기 버튼
				$('#'+divId+" .fnBtnClose").click(function(){
					if( typeof param.closeIconFn =="function" ){
						param.closeIconFn();
					}
				});

				//사용자 함수 로드 호출
				if( typeof param.onLoadFn =="function" ){
					param.onLoadFn();				
				}			

				//키 이벤트를 통한 이벤트 방지 focus 이동
				try{
					comm.focus(divId+"_dummyfocus");
					$("#"+divId+" li.title_pop").click(); //ie focus 이동을 위해 팝업 dummy TItle 클릭 기능 넣음
				}catch(e){
				}
				setTimeout(function(){
					try{
						$("#"+divId+"_dummyfocusDiv").remove();					
					}catch(e){}
				}, 100);
				
				
			});

			return bpoupObject;
		},
		
		/**
		 * 레이어 경고창을 띄움.
		 * @param message	경고창 메세지
		 * @param callback : 확인 버튼 누를시 호출될 함수
		 * @param option : 
		 */
		alert : function(message, callback){
			message = comm.replaceBr(message);
			
			if( typeof callback != "function"){
				callback = function(){};
			}
			var bpoupObject = comm.layerAlert({
				msg		: message	//화면에 표시될 메세지
				,	btnFn	: [callback]
				, closeIconFn : callback
			});
			return bpoupObject;

		},
		alertError : function(message, callback){
			message = comm.replaceBr(message);
			
			if( typeof callback != "function"){
				callback = function(){};
			}
			var bpoupObject = comm.layerAlert({
				msg		: message	//화면에 표시될 메세지
				,	btnFn	: [callback]
				, closeIconFn : callback
				,	imgType : 'alert'	
			});
			return bpoupObject;
		},
		alertInfo : function(message, callback){
			message = comm.replaceBr(message);
			
			if( typeof callback != "function"){
				callback = function(){};
			}
			var bpoupObject = comm.layerAlert({
				msg		: message	//화면에 표시될 메세지
				,	btnFn	: [callback]
				, closeIconFn : callback
				,	imgType : 'info'	
			});
			return bpoupObject;
		},
		
		/**
		 * confirm  기능
		 * @param message
		 * @param callbackYesFn
		 * @param callbackCancelFn
		 * @param option
		 */
		confirm : function(message, callbackYesFn, callbackCancelFn){
			message = comm.replaceBr(message);
			
			var label_common_ok	= "확인";
			var label_common_cancel	= "취소";

			if( typeof callbackYesFn != "function"){
				callbackYesFn = function(){};
			}
			if( typeof callbackCancelFn != "function"){
				callbackCancelFn = function(){};
			}
			var param = {
				titleView : true//Title Line 표시 여부
				,	title	: ''	//타이틀 표시 화면
				,	imgType : ''	//값이 있을 경우 이미지 보여줌[info,alert]
				,	msg		: message	//화면에 표시될 메세지
				,	btnCnt  : 2		//버튼의 갯수 1,2 
				,	btnText : [label_common_ok,label_common_cancel] //버튼에 들어갈 텍스트 배열
				,	btnFn	: [callbackYesFn,callbackCancelFn] //버튼에 들어갈 이벤트
				,	onLoadFn : function(){} //화면이 로드후 이벤트 바인딩 작업
				,	closeIconFn : callbackCancelFn
			};		
			var bpoupObject = comm.layerAlert(param);	
			return bpoupObject;
		},
		confirmInfo : function(message, callbackYesFn, callbackCancelFn){
			message = comm.replaceBr(message);
			
			var label_common_ok	= "확인";
			var label_common_cancel	= "취소";
			
			if( typeof callbackYesFn != "function"){
				callbackYesFn = function(){};
			}
			if( typeof callbackCancelFn != "function"){
				callbackCancelFn = function(){};
			}
			var param = {
				titleView : true//Title Line 표시 여부
				,	title	: ''	//타이틀 표시 화면
				,	imgType : 'info'	//값이 있을 경우 이미지 보여줌[info,alert]
				,	msg		: message	//화면에 표시될 메세지
				,	btnCnt  : 2		//버튼의 갯수 1,2 
				,	btnText : [label_common_ok,label_common_cancel] //버튼에 들어갈 텍스트 배열
				,	btnFn	: [callbackYesFn,callbackCancelFn] //버튼에 들어갈 이벤트
				,	onLoadFn : function(){} //화면이 로드후 이벤트 바인딩 작업
				,	closeIconFn : callbackCancelFn
			};		
			var bpoupObject = comm.layerAlert(param);	
			return bpoupObject;
		},
		confirmError : function(message, callbackYesFn, callbackCancelFn){
			message = comm.replaceBr(message);
			
			var label_common_ok	= "확인";
			var label_common_cancel	= "취소";

			if( typeof callbackYesFn != "function"){
				callbackYesFn = function(){};
			}
			if( typeof callbackCancelFn != "function"){
				callbackCancelFn = function(){};
			}
			var param = {
				titleView : true//Title Line 표시 여부
				,	title	: ''	//타이틀 표시 화면
				,	imgType : 'alert'	//값이 있을 경우 이미지 보여줌[info,alert]
				,	msg		: message	//화면에 표시될 메세지
				,	btnCnt  : 2		//버튼의 갯수 1,2 
				,	btnText : [label_common_ok,label_common_cancel] //버튼에 들어갈 텍스트 배열
				,	btnFn	: [callbackYesFn,callbackCancelFn] //버튼에 들어갈 이벤트
				,	onLoadFn : function(){} //화면이 로드후 이벤트 바인딩 작업
				,	closeIconFn : callbackCancelFn
			};		
			var bpoupObject =comm.layerAlert(param);	
			return bpoupObject;
		},
		
		/**
		 * 팝업 레이어(페이지 호출 방식)
		 * @param loadUrl 호출할 URL (예)  commCtxPath+'/common/promptPopup.do'
		 * @param loadCallbackFn : 로드 완료 후 호출될 사용자 정의 함수 ( 파일명Init() )
		 * @param onCloseFn : 닫기 버튼을 호출후 실행될 함수 ( 생성된 div는 remove됩니다.)
		 * @param options : bpopup 시 추가 및 변경 할 option 값
		 * @returns popupObject ( 팝업 객체를 반환함, 팝업을 닫을경우 popupObject.close(); , 팝업 아이디 popupObject.attr("id") )
		 */
		popupUrl : function( loadUrl , loadCallbackFn , onCloseFn, options ){
			//동적으로 div 를 추가 하는 방식을 사용함.	
			var currentCnt = 0;
			for(var i = 0;i < 100 ; i++){
				if($("#commmBpopup"+i).length == 0){
					currentCnt = i;
					break;
				}
			}
			var tagId = "commmBpopup"+currentCnt;
			var $divLayerBg	= $("<div id='"+tagId+"' style='display:none'></div>");
			$divLayerBg.appendTo('body');	

			var isChagneOpacity = false;	
			if(options!=null){
				if( options.get("opacity") != null )
					isChagneOpacity = true;
			}
			
			var popupObject = $("#"+tagId).bPopup({
				modalClose: false, //배경클릭으로 닫힘 방지
				closeClass : 'fnClose',
				contentContainer:'#'+tagId,
				loadUrl : loadUrl,
				opacity: (isChagneOpacity == true?  options.get("opacity") : 0.7),
				loadCallback : function() {
					//화면 구성 및 이벤트 바인딩.
					if( typeof loadCallbackFn == "function" ){
						loadCallbackFn( tagId );  // 타겟아이디가 인자로 전달됨
					}
				},
				onClose : function(){
					//동적으로 만든 태그를 제거함
					$("#"+tagId).remove();
					if( typeof onCloseFn == "function" ){
						onCloseFn( tagId ); // 타겟아이디가 인자로 전달됨
					}
				}
			});
			return popupObject;
		},

		/**
		 * 팝업 레이어(페이지 호출 방식)
		 * @param loadUrl 호출할 URL
		 * @param onOpenCallbackFn : 오픈 후 호출될 사용자 정의 함수 ( 파일명Init() )
		 * @param onCloseFn : 닫기 버튼을 호출후 실행될 함수 
		 * @returns popupObject ( 팝업 객체를 반환함, 팝업을 닫을경우 popupObject.close(); , 팝업 아이디 popupObject.attr("id") )
		 */
		popupDiv : function( divId , onOpenCallbackFn , onCloseFn ){
			if( $("#"+divId).length == 0 ){
				comm.alert("Not found Popup Object ID : "+divId);
				return;
			}		
			var popupObject = $("#"+divId).bPopup({
				modalClose: false, //배경클릭으로 닫힘 방지
				closeClass : 'fnClose',
				contentContainer:'#'+divId,
				onOpen : function() {
					//화면 구성 및 이벤트 바인딩.
					if( typeof onOpenCallbackFn == "function" ){
						onOpenCallbackFn( divId );
					}
				},
				onClose : function(){
					//동적으로 만든 태그를 제거함
					if( typeof onCloseFn == "function" ){
						onCloseFn( divId );
					}
				}
			});
			return popupObject;
		},


		popupImage : function( imageUrl , loadCallbackFn , onCloseFn ){
			//동적으로 div 를 추가 하는 방식을 사용함.	
			var currentCnt = 0;
			for(var i = 0;i < 100 ; i++){
				if($("#commmBpopup"+i).length == 0){
					currentCnt = i;
					break;
				}
			}
			var tagId = "commmBpopup"+currentCnt;
			var $divLayerBg	= $("<div id='"+tagId+"' style='display:none'></div>");
			$divLayerBg.appendTo('body');	

			var popupObject = $("#"+tagId).bPopup({
				content:'image',
				modalClose: true, //배경클릭으로 닫힘
				closeClass : 'fnClose',
				contentContainer:'#'+tagId,
				loadUrl : imageUrl,
				loadCallback : function() {
					//화면 구성 및 이벤트 바인딩.
					if( typeof loadCallbackFn == "function" ){
						loadCallbackFn( tagId );  // 타겟아이디가 인자로 전달됨					
						//로드된 이미지 클릭시 닫기( 아래 코드 사용 )
						//$("#"+tagId).click(function(){ $("#"+tagId).bPopup().close();});
					}
				},
				onClose : function(){
					//동적으로 만든 태그를 제거함
					$("#"+tagId).remove();
					if( typeof onCloseFn == "function" ){
						onCloseFn( tagId ); // 타겟아이디가 인자로 전달됨
					}
				}
			});
			return popupObject;
		},
		
		/**
		 * SSW SELECT BOX 값 선택
		 * 	selectmenu setbinding
		 */
		setSelectmenu : function(dropdown, selectedValue) {
			if( $("#"+ dropdown).length == 0 ){
				return;
			}

			$("#"+ dropdown +" option").each(function(){
				if(Number($(this).val()) === selectedValue || $(this).val() === selectedValue) {
					$(this).prop("selected", true);
				}
			});
			$("#"+dropdown).ssse_selectmenu("refresh");
		},		
		
		/**
		 * REST JSON 통신 전용
		 * 
		 * 참조 사항 : 
		 * 	Body json 데이터를 전송시 아래 값으로 전송(PUT,POST 등에서 body에 json을 통해 객체 변환을 해야하는 경우)
		 * 	dataType = 'json', contentType = 'application/json', data = JSON.stringify(json데이터객체)
		 * @param url (*필수) : URL
		 * @param type (*필수) : POST,GET,PUT,DELETE
		 * @param data (*필수) : 전송 데이터가 없을시 null 입력 
		 * @param success (*필수) : 
		 * @param error 
		 * @param beforeSend
		 * @param complete
		 * @param async : [true(비동기)|false(동기)] 기본값 : true 
		 * @param dataType
		 * @param contentType : default: 'application/x-www-form-urlencoded; charset=UTF-8'
		 */
		rest : function(url, type, data, successFn, errorFn, beforeSendFn, completeFn, async, dataType, contentType){

			if( typeof url == 'undefined'  ) return; //(*필수)	
			if( typeof type == 'undefined'  ) return;//(*필수)	
			if( typeof data == 'undefined'  ) data = {};//없을경우 null처리함		
			if( typeof successFn != 'function' ) return;//(*필수)

			if( typeof errorFn != 'function' ) errorFn = function(){};
			if( typeof beforeSendFn != 'function' ) beforeSendFn = function(){};
			if( typeof completeFn != 'function' ) completeFn = function(){};
			if( typeof async != 'boolean' ) async = true;

			if( typeof dataType != 'string' ) dataType = null; //typeof null == object로 출력됨.
			if( typeof contentType != 'string' ) contentType = null; //typeof null == object로 출력됨.
			
			/*
			if( data == null ){
				data = {};
			}
			if( typeof data == "object" ){
				data.cacheClear = comm.getTimestamp();
			}
			*/
			var restVersion = {
				'Rest-Version' : '1.0',
				"Access-Control-Allow-Origin": "*"
			};
			
			var p = {
				url 		: url,
				type		: type,
				data        : data,
				headers		: restVersion, // 버전의 경우 개별 설정 가능
				//dataType	: "json", // Intelligent Guess (xml, json, script, or html))
				//contentType : 'application/json',	// contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8')
				async		: async,
				cache 		: false,
				success 	: function(json, textStatus, jqXHR) {
					if(successFn) successFn(json, textStatus, jqXHR);
				}
				,
				error 	: function( jqXHR, textStatus, SerrorThrown){
					if(errorFn) errorFn(jqXHR, textStatus, SerrorThrown); //사용자 콜백
				}
				, beforeSend : function( jqXHR, settings){
					if(beforeSendFn) beforeSendFn(jqXHR, settings); //사용자 콜백
				}
				, complete : function( jqXHR, textStatus ){ 
					if(completeFn) completeFn(jqXHR, textStatus); //사용자 콜백
				},
			};
			if(withCredentialsMode) {
				p.xhrFields = {
					withCredentials: true
				}
			}

			if( typeof dataType == "string" && $.trim(dataType) != "" ){
				p.dataType	= dataType;
			}
			if( typeof contentType == "string"  && $.trim(contentType) != "" ){
				p.contentType	= contentType;
			}

			$.ajax(p);
		},
		
		/**
		 * 초 단위 시간을 hh:mm:ss 형식의 기간으로 변경
		 */
		secondConvertor : function(sec){
			if(sec<0){
				sec = 0;
			}
			var second = sec % 60 + "";
			var hour = Math.floor((sec/60) / 60) + "";
			var minute = Math.floor((sec/60) % 60) + "";

			return comm.zeroPad(hour) + ':' + comm.zeroPad(minute) + ':' + comm.zeroPad(second);
		},
		
		/**
		 * Get Highest Z Index	
		 */	
		getHighestZIndex : function(){
			var index_highest = 0; 
			$("*").each(function() {
				var index_current = parseInt($(this).css("zIndex"), 10);
				if(index_current > index_highest) {
					index_highest = index_current;
				}
			});
			return index_highest;
		},
		
		/*
	     * 소수점 자릿수 맞춤(AS-IS 유지)
	     */
		zeroPad : function (num) {
			var s = '0' + num;
			return s.substring(s.length-2);
		},
		
		/**
		 * Input tag foucs()
		 * @param id
		 */
		focus : function (id) {
			if( $("#"+id).length == 0  ){
				return;
			}
			setTimeout(function(){
				$("#"+id).focus();
			}, 5);
		},
		
		/**
	     * ReplaceAll 변환작업, str에 str1을 str2로 
	     * @param str
	     * @param str1
	     * @param str2
	     * @returns
	     */
		replaceAll : function(str, str1, str2){
			var temp_str = str;
			temp_str = temp_str.replace(eval("/" + str1 + "/gi"), str2);
			return temp_str;
		},
		
		/**
		 * 프로퍼티에서 읽어진 \n 을 <br/> 로 변경 처리 할때 사용
		 * html 방식으로 변경됨에 따라, alert를 사용하다가 comm.alert를 사용시 줄바꿈 처리에 사용함
		 * @param msg
		 * @returns
		 */
		replaceBr : function( msg ){
			var temp_str = comm.replaceAll( msg , "\\\\n","<br/>");
			temp_str = comm.replaceAll( temp_str , "\\n","<br/>");
			return temp_str;
		},
		
		/**
		 * ctime,mtime 등 유닉스 타임스탬프를 사용자가 설정한 포멧으로 변환해서 처리해줌
		 * (1번째 인자만 넣을경우, User 객체의 dateFormat, timeFormat 기준으로 변환해서 반환함)
		 * @param timeStamp : unixTime 
		 * @param (옵션) timeFormat : 예) YYYY-MM-DD HH:mm:ss
		 * @param (옵션) timeZone : 제공된 시간에서 TimeOff계산 분단위 입력
		 * @returns
		 * 
		 * 	timeFormat 포멧규격
		 * 		H HH	0..23	24 hour time
		 * 		h hh	1..12	12 hour time used with a A.
		 * 		a A	am pm	Post or ante meridiem
		 * 		m mm	0..59	Minutes
		 * 		s ss	0..59	Seconds
		 * 		S	0..9	Tenths of a second
		 * 		SS	0..99	Hundreds of a second
		 * 		SSS	0..999	Thousandths of a second
		 * 		Z ZZ	+12:00	Offset from UTC as +-HH:mm, +-HHmm, or Z
		 */
		getDateFromTimestamp : function() {

			var timeStamp;
			var timeFormat 	= "";
			var timeZone 	= 0;

			if( arguments.length == 1 ){
				timeStamp = arguments[0];
			}else if( arguments.length == 2 ){
				timeStamp = arguments[0];
				timeFormat= arguments[1];
			}else if( arguments.length == 3 ){
				timeStamp = arguments[0];
				timeFormat= arguments[1];
				timeZone= arguments[2];			
			}else{
				return;
			}

			var _dataFormatString = "YYYY-MM-DD";
			if( typeof commUserDateFormatString != "undefined"){
				_dataFormatString = commUserDateFormatString;
			}
			if( $.trim(timeFormat).length <= 0){
				timeFormat = _dataFormatString;
			}


			var date =  new Date(parseInt(timeStamp) * 1000)
			var dateFormat = timeFormat;
			if( !isNaN(timeZone) && Number(timeZone) != 0 ){
				return moment(date).zone(timeZone).format(dateFormat);
			}else{
				return moment(date).format(dateFormat);
			}
		},
		
		/**
		 * 로딩바 보여주기.
		 *@param modal boolean (옵션) : 모달로 띄울경우 comm.showLoading(true);
		 *@param timeout (옵션) : 기본값 10초, 입력 단위 초단위 ( 0 이하 값은 기본값으로 변환됨.)
		 */
		showLoading : function(){
			var modal = false;
			var loadingImgArr =[{
				width:39,
				height:39,
				frames:11,
				fileName:'loading.png'
			},
			{
				width:34,
				height:34,
				frames:4,
				fileName:'loading_'
			}, 
			{
				width:19,
				height:19,
				frames:4,
				fileName:'distribution_popup_loading_'
			}, 
			{
				width:25,
				height:25,
				frames:4,
				fileName:'toast_loading_'
			}];

			var loadingFileIdx = 0;
			var timeOut = 10;

			if(arguments.length >= 1 && typeof arguments[0] == "boolean" ){
				modal = arguments[0];
			}	
			if(arguments.length >= 2 && !isNaN(arguments[1]) ){
				try{
					loadingFileIdx = Number( arguments[1] );
					if(loadingFileIdx > 2 && loadingFileIdx < 0) {
						loadingFileIdx = 0;
					}
				} catch(e) {
					loadingFileIdx = 0;
				}
			}
			if(arguments.length == 3 && !isNaN(arguments[2])) {
				try{
					timeOut = Number( arguments[2] );
					if(timeOut <= 0){
						timeOut = 10;
					}
				}catch(e){
					timeOut = 10;
				}
			}
			
			var loadingImgInfo = loadingImgArr[loadingFileIdx];

			if( $("#commLoading").length <= 0){
				var htmlStr 	= "";
				if( modal ){
					htmlStr 	= htmlStr + "<div id='commLoading' modal='1' style='display:none'>";
				}else{				
					htmlStr 	= htmlStr + "<div id='commLoading' modal='0' style='display:none;position:absolute;top:100px;left:100px'>";
				}
				htmlStr 		= htmlStr + "<canvas id='commLoadingCanvas' width='" + loadingImgInfo.width + "' height='" + loadingImgInfo.height + "'></canvas>";
				htmlStr 		= htmlStr + "</div>";

				var $divAlert	= $(htmlStr);
				$divAlert.appendTo('body');
			} else {
				return;
			}
			
			$("#commLoading").css("z-index",(comm.getHighestZIndex()+1));
			$("#commLoading").show();
			//레이어 가운데로 위치시킴
			$("#commLoading").center();
			if( modal ){
				_loadingModalObjext = $("#commLoading").bPopup({
					modalClose: false, //배경클릭으로 닫힘 방지
					autoClose : ( 1000 * timeOut )	//Auto closes after 1000ms/1sec
				});
			}
			
			var currentFrame = 1,
				canvas = document.getElementById("commLoadingCanvas"),
				ctx = canvas.getContext("2d"),
				image = new Image(),
				loadingDraw;
				

			if(loadingFileIdx == 0) {
				
				currentFrame = 0;
				image.src = commCtxPath+'/images/common/' + loadingImgInfo.fileName;
				
				loadingDraw = function(){
					ctx.clearRect(0, 0, loadingImgInfo.width, loadingImgInfo.height);
					ctx.drawImage(image, 0, loadingImgInfo.height * currentFrame, loadingImgInfo.width, loadingImgInfo.height, 0, 0, loadingImgInfo.width, loadingImgInfo.height);
					if (currentFrame === loadingImgInfo.frames) {
						currentFrame = 0;
					} else {
						currentFrame++;
					}
				};
			} else {
				loadingDraw = function(){
					image.src = commCtxPath+'/images/common/' + loadingImgInfo.fileName + currentFrame + '.png';
					ctx.clearRect(0, 0, loadingImgInfo.width, loadingImgInfo.height);
					ctx.drawImage(image, 0, 0, loadingImgInfo.width, loadingImgInfo.height, 0, 0, loadingImgInfo.width, loadingImgInfo.height);
					if (currentFrame === loadingImgInfo.frames) {
						currentFrame = 1;
					} else {
						currentFrame++;
					}
				};
			}


			if( $("#commLoading").length > 0 ){
				_loadingImageTimer = setInterval(loadingDraw, 100);
			}
		},
		/**
		 * 로딩바 감추기
		 */
		hideLoading : function(){
			try{
				clearInterval(_loadingImageTimer); //typeof _loadingImageTimer == "number"
			}catch(e){}

			if( $("#commLoading").length == 1 ){
				if ( $("#commLoading").attr('modal') == "1" ){
					_loadingModalObjext.close();
				}
				$("#commLoading").remove();
			}
		},
		
		/*
	     * 16진수 -> 10진수 변환
	     */
		hex2dec : function (in16, len) {
			var n10 = parseInt(in16, 16);
			var newValue = n10;
			if( typeof len != "undefined" && !isNaN(len)){
				var appendCnt = len - String(n10).length;
				for(var i = 0 ; i < appendCnt ; i ++ ){
					newValue = "0" + newValue;
				}
			}
			return newValue;		
		},
		
		/**
		 * 윈도우 파일명과 동일하게 제약사항 반영
	     * @param data
	     * @returns
	     */
		checkSpecialChar : function(data)
		{
			var iChars = "\|:\\\"<>/?*"; 

			for (var i = 0; i < data.length; i++) 
			{
				if (iChars.indexOf(data.charAt(i)) != -1) // 특수문자가 존재하는 경우 
				{
					return data.charAt(i);
				}
			}
			return false; 
		}
}

/**************************************************************
 * 								jQuery Extend
 **************************************************************/

//mock Globalize numberFormat for mins and secs using jQuery spinner ...
if (!window.Globalize) window.Globalize = {
        format: function(number, format) {
                number = String(this.parseFloat(number, 10) * 1);
                format = (m = String(format).match(/^[nd](\d+)$/)) ? m[1] : 2;
                for (i = 0; i < format - number.length; i++)
                        number = '0'+number;
                return number;
        },
        parseFloat: function(number, radix) {
                return parseFloat(number, radix || 10);
        }
};

/*!
 * jQuery UI SSE spinner
 */
function spinner_modifier( fn ) {
	return function() {
		var previous = this.element.val();
		fn.apply( this, arguments );
		this._refresh();
		if ( previous !== this.element.val() ) {
			this._trigger( "change" );
		}
	};
}

var spinner = $.widget( "ui.sse_spinner", {
	version: "1.11.2",
	defaultElement: "<input>",
	widgetEventPrefix: "spin",
	options: {
		culture: null,
		icons: {
			down: "spinner_down_icon",
			up: "spinner_up_icon"
		},
		increment: "slow",
		max: null,
		min: null,
		numberFormat: null,
		page: 10,
		step: 1,

		change: null,
		spin: null,
		start: null,
		stop: null
	},

	_create: function() {
		// handle string values that need to be parsed
		this._setOption( "max", this.options.max );
		this._setOption( "min", this.options.min );
		this._setOption( "step", this.options.step );

		// Only format if there is a value, prevents the field from being marked
		// as invalid in Firefox, see #9573.
		if ( this.value() !== "" ) {
			// Format the value, but don't constrain.
			this._value( this.element.val(), true );
		}

		this._draw();
		this._on( this._events );
		this._refresh();

		// turning off autocomplete prevents the browser from remembering the
		// value when navigating through history, so we re-enable autocomplete
		// if the page is unloaded before the widget is destroyed. #7790
		this._on( this.window, {
			beforeunload: function() {
				this.element.removeAttr( "autocomplete" );
			}
		});
	},

	_getCreateOptions: function() {
		var options = {},
			element = this.element;

		$.each( [ "min", "max", "step" ], function( i, option ) {
			var value = element.attr( option );
			if ( value !== undefined && value.length ) {
				options[ option ] = value;
			}
		});

		return options;
	},

	_events: {
		keydown: function( event ) {
			if ( this._start( event ) && this._keydown( event ) ) {
				event.preventDefault();
			}
		},
		keyup: "_stop",
		focus: function() {
			this.previous = this.element.val();
		},
		blur: function( event ) {
			if ( this.cancelBlur ) {
				delete this.cancelBlur;
				return;
			}

			this._stop();
			this._refresh();
			if ( this.previous !== this.element.val() ) {
				this._trigger( "change", event );
			}
		},
		mousewheel: function( event, delta ) {
			if ( !delta ) {
				return;
			}
			if ( !this.spinning && !this._start( event ) ) {
				return false;
			}

			this._spin( (delta > 0 ? 1 : -1) * this.options.step, event );
			clearTimeout( this.mousewheelTimer );
			this.mousewheelTimer = this._delay(function() {
				if ( this.spinning ) {
					this._stop( event );
				}
			}, 100 );
			event.preventDefault();
		},
		"mousedown .ui-spinner-button": function( event ) {
			var previous;

			// We never want the buttons to have focus; whenever the user is
			// interacting with the spinner, the focus should be on the input.
			// If the input is focused then this.previous is properly set from
			// when the input first received focus. If the input is not focused
			// then we need to set this.previous based on the value before spinning.
			previous = this.element[0] === this.document[0].activeElement ?
				this.previous : this.element.val();
			function checkFocus() {
				var isActive = this.element[0] === this.document[0].activeElement;
				if ( !isActive ) {
					this.element.focus();
					this.previous = previous;
					// support: IE
					// IE sets focus asynchronously, so we need to check if focus
					// moved off of the input because the user clicked on the button.
					this._delay(function() {
						this.previous = previous;
					});
				}
			}

			// ensure focus is on (or stays on) the text field
			event.preventDefault();
			checkFocus.call( this );

			// support: IE
			// IE doesn't prevent moving focus even with event.preventDefault()
			// so we set a flag to know when we should ignore the blur event
			// and check (again) if focus moved off of the input.
			this.cancelBlur = true;
			this._delay(function() {
				delete this.cancelBlur;
				checkFocus.call( this );
			});

			if ( this._start( event ) === false ) {
				return;
			}

			this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );
		},
		"mouseup .ui-spinner-button": "_stop",
		"mouseenter .ui-spinner-button": function( event ) {
			// button will add ui-state-active if mouse was down while mouseleave and kept down
			if ( !$( event.currentTarget ).hasClass( "ui-state-active" ) ) {
				return;
			}

			if ( this._start( event ) === false ) {
				return false;
			}
			this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );
		},
		// TODO: do we really want to consider this a stop?
		// shouldn't we just stop the repeater and wait until mouseup before
		// we trigger the stop event?
		"mouseleave .ui-spinner-button": "_stop"
	},

	_draw: function() {
		var uiSpinner = this.uiSpinner = this.element
			.addClass( "ui-spinner-input" )
			.attr( "autocomplete", "off" )
			.wrap( this._uiSpinnerHtml() )
			.parent()
				// add buttons
				.append( this._buttonHtml() );

		this.element.attr( "role", "spinbutton" );

		// button bindings
		this.buttons = uiSpinner.find( ".ui-spinner-button" )
			.attr( "tabIndex", -1 )
			.button()
			.removeClass( "ui-corner-all" );

		// IE 6 doesn't understand height: 50% for the buttons
		// unless the wrapper has an explicit height
		if ( this.buttons.height() > Math.ceil( uiSpinner.height() * 0.5 ) &&
				uiSpinner.height() > 0 ) {
			uiSpinner.height( uiSpinner.height() );
		}

		// disable spinner if element was already disabled
		if ( this.options.disabled ) {
			this.disable();
		}
	},

	_keydown: function( event ) {
		var options = this.options,
			keyCode = $.ui.keyCode;

		switch ( event.keyCode ) {
		case keyCode.UP:
			this._repeat( null, 1, event );
			return true;
		case keyCode.DOWN:
			this._repeat( null, -1, event );
			return true;
		case keyCode.PAGE_UP:
			this._repeat( null, options.page, event );
			return true;
		case keyCode.PAGE_DOWN:
			this._repeat( null, -options.page, event );
			return true;
		}

		return false;
	},

	_uiSpinnerHtml: function() {
		return "<span class='ui-spinner ui-widget ui-widget-content'></span>";
	},

	_buttonHtml: function() {
		return "" +
			"<a class='ui-spinner-button ui-spinner-up'>" +
				"<span class='spinner_icon " + this.options.icons.up + "'></span>" +
			"</a>" +
			"<a class='ui-spinner-button ui-spinner-down'>" +
				"<span class='spinner_icon " + this.options.icons.down + "'></span>" +
			"</a>";
	},

	_start: function( event ) {
		if ( !this.spinning && this._trigger( "start", event ) === false ) {
			return false;
		}

		if ( !this.counter ) {
			this.counter = 1;
		}
		this.spinning = true;
		return true;
	},

	_repeat: function( i, steps, event ) {
		i = i || 500;

		clearTimeout( this.timer );
		this.timer = this._delay(function() {
			this._repeat( 40, steps, event );
		}, i );

		this._spin( steps * this.options.step, event );
	},

	_spin: function( step, event ) {
		var value = this.value() || 0;

		if ( !this.counter ) {
			this.counter = 1;
		}

		value = this._adjustValue( value + step * this._increment( this.counter ) );

		if ( !this.spinning || this._trigger( "spin", event, { value: value } ) !== false) {
			this._value( value );
			this.counter++;
		}
	},

	_increment: function( i ) {
		var incremental = this.options.incremental;

		if ( incremental ) {
			return $.isFunction( incremental ) ?
				incremental( i ) :
				Math.floor( i * i * i / 50000 - i * i / 500 + 17 * i / 200 + 1 );
		}

		return 1;
	},

	_precision: function() {
		var precision = this._precisionOf( this.options.step );
		if ( this.options.min !== null ) {
			precision = Math.max( precision, this._precisionOf( this.options.min ) );
		}
		return precision;
	},

	_precisionOf: function( num ) {
		var str = num.toString(),
			decimal = str.indexOf( "." );
		return decimal === -1 ? 0 : str.length - decimal - 1;
	},

	_adjustValue: function( value ) {
		var base, aboveMin,
			options = this.options;

		// make sure we're at a valid step
		// - find out where we are relative to the base (min or 0)
		base = options.min !== null ? options.min : 0;
		aboveMin = value - base;
		// - round to the nearest step
		aboveMin = Math.round(aboveMin / options.step) * options.step;
		// - rounding is based on 0, so adjust back to our base
		value = base + aboveMin;

		// fix precision from bad JS floating point math
		value = parseFloat( value.toFixed( this._precision() ) );

		// clamp the value
		if ( options.max !== null && value > options.max) {
			return options.max;
		}
		if ( options.min !== null && value < options.min ) {
			return options.min;
		}

		return value;
	},

	_stop: function( event ) {
		if ( !this.spinning ) {
			return;
		}

		clearTimeout( this.timer );
		clearTimeout( this.mousewheelTimer );
		this.counter = 0;
		this.spinning = false;
		this._trigger( "stop", event );
	},

	_setOption: function( key, value ) {
		if ( key === "culture" || key === "numberFormat" ) {
			var prevValue = this._parse( this.element.val() );
			this.options[ key ] = value;
			this.element.val( this._format( prevValue ) );
			return;
		}

		if ( key === "max" || key === "min" || key === "step" ) {
			if ( typeof value === "string" ) {
				value = this._parse( value );
			}
		}
		if ( key === "icons" ) {
			this.buttons.first().find( ".ui-icon" )
				.removeClass( this.options.icons.up )
				.addClass( value.up );
			this.buttons.last().find( ".ui-icon" )
				.removeClass( this.options.icons.down )
				.addClass( value.down );
		}

		this._super( key, value );

		if ( key === "disabled" ) {
			this.widget().toggleClass( "ui-state-disabled", !!value );
			this.element.prop( "disabled", !!value );
			this.buttons.button( value ? "disable" : "enable" );
		}
	},

	_setOptions: spinner_modifier(function( options ) {
		this._super( options );
	}),

	_parse: function( val ) {
		if ( typeof val === "string" && val !== "" ) {
			val = window.Globalize && this.options.numberFormat ?
				Globalize.parseFloat( val, 10, this.options.culture ) : +val;
		}
		return val === "" || isNaN( val ) ? null : val;
	},

	_format: function( value ) {
		if ( value === "" ) {
			return "";
		}
		return window.Globalize && this.options.numberFormat ?
			Globalize.format( value, this.options.numberFormat, this.options.culture ) :
			value;
	},

	_refresh: function() {
		this.element.attr({
			"aria-valuemin": this.options.min,
			"aria-valuemax": this.options.max,
			// TODO: what should we do with values that can't be parsed?
			"aria-valuenow": this._parse( this.element.val() )
		});
	},

	isValid: function() {
		var value = this.value();

		// null is invalid
		if ( value === null ) {
			return false;
		}

		// if value gets adjusted, it's invalid
		return value === this._adjustValue( value );
	},

	// update the value without triggering change
	_value: function( value, allowAny ) {
		var parsed;
		if ( value !== "" ) {
			parsed = this._parse( value );
			if ( parsed !== null ) {
				if ( !allowAny ) {
					parsed = this._adjustValue( parsed );
				}
				value = this._format( parsed );
			}
		}
		this.element.val( value );
		this._refresh();
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-spinner-input" )
			.prop( "disabled", false )
			.removeAttr( "autocomplete" )
			.removeAttr( "role" )
			.removeAttr( "aria-valuemin" )
			.removeAttr( "aria-valuemax" )
			.removeAttr( "aria-valuenow" );
		this.uiSpinner.replaceWith( this.element );
	},

	stepUp: spinner_modifier(function( steps ) {
		this._stepUp( steps );
	}),
	_stepUp: function( steps ) {
		if ( this._start() ) {
			this._spin( (steps || 1) * this.options.step );
			this._stop();
		}
	},

	stepDown: spinner_modifier(function( steps ) {
		this._stepDown( steps );
	}),
	_stepDown: function( steps ) {
		if ( this._start() ) {
			this._spin( (steps || 1) * -this.options.step );
			this._stop();
		}
	},

	pageUp: spinner_modifier(function( pages ) {
		this._stepUp( (pages || 1) * this.options.page );
	}),

	pageDown: spinner_modifier(function( pages ) {
		this._stepDown( (pages || 1) * this.options.page );
	}),

	value: function( newVal ) {
		if ( !arguments.length ) {
			return this._parse( this.element.val() );
		}
		spinner_modifier( this._value ).call( this, newVal );
	},

	widget: function() {
		return this.uiSpinner;
	}
});

/**!
 * jQuery insertAtIndex
 * project-site: https://github.com/oberlinkwebdev/jQuery.insertAtIndex
 * @author: Jesse Oberlin
 * @version 1.0
 * Copyright 2012, Jesse Oberlin
 * Dual licensed under the MIT or GPL Version 2 licenses.
*/

(function ($) { 
	/**
	 * JQuery Extension	
	 */	
	
	$.fn.extend({
		
		/**!
		 * jQuery insertAtIndex
		 * project-site: https://github.com/oberlinkwebdev/jQuery.insertAtIndex
		 * @author: Jesse Oberlin
		 * @version 1.0
		 * Copyright 2012, Jesse Oberlin
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		*/
		insertAtIndex : function(index,selector){
		    var opts = $.extend({
		        index: 0,
		        selector: '<div/>'
		    }, {index: index, selector: selector});
		    return this.each(function() {
		        var p = $(this);  
		        var i = ($.isNumeric(opts.index) ? parseInt(opts.index) : 0);
		        if(i <= 0)
		            p.prepend(opts.selector);
		        else if( i > p.children().length-1 )
		            p.append(opts.selector);
		        else
		            p.children().eq(i).before(opts.selector);       
		    });
		},
		
		center: function(){	// 레이어 가운데로

			return this.each(function() {
				var $this 	= $(this);

				var posX = -1;
				var posY = -1;

				//console.log( $this.attr("posX") +" , "+$this.attr("posY"));   

				if($(this).attr("posX")){
					if(!isNaN( $(this).attr("posX") ) ){
						posX	= Number($(this).attr("posX"));
						//$this.removeAttr("posX");
					}
				}
				if($(this).attr("posY")){
					if(!isNaN( $(this).attr("posY") ) ){
						posY	= Number( $(this).attr("posY"));
						//$this.removeAttr("posY");
					}
				}
				$this.attr("posX",-1);
				$this.attr("posY",-1);

				var posTop	= Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop());
				var posLeft	= Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft());

				//console.log( "["+posTop+", "+posLeft+"] > ["+posX+", "+posY+"]" );   

				if(posX >= 0){
					posTop	= posX;
				}
				if(posY >= 0){
					posLeft	= posY;
				}

				$this.css({
					position: 'absolute',
					margin: 0,
					top: posTop,
					left: posLeft
				});
			});
		},
		fnOnlyNum : function(){	// 숫자만 입력
			$(this).keyup(function(){ 
				var exp = /^[0-9]+$/;
				if(!exp.test($(this).val()) && $(this).val() != ''){
					if($(this).attr('fnOnlyNumMsg')){ alert($(this).attr('fnOnlyNumMsg')); }
					$(this).val('');
				}
			}).focusout(function(){
				var exp = /^[0-9]+$/;
				if(!exp.test($(this).val()) && $(this).val() != ''){
					$(this).val('');
				}				
			});
		},
		fnOnlyNumRange : function(){	// 숫자 범위만 입력, 추가 속성 min, max
			$(this).keyup(function(){ 
				var exp = /^[0-9]+$/;
				if(!exp.test($(this).val()) && $(this).val() != ''){
					if($(this).attr('fnOnlyNumRangeMsg')){ alert($(this).attr('fnOnlyNumRangeMsg')); }
					$(this).val('');					
				}
				if($(this).val() != ''){					
					$(this).val(Number( $(this).val() ));					
					//숫자인 경우
					if($(this).attr('min')){
						if( Number($(this).val()) < Number($(this).attr('min')) ){
							$(this).val( Number($(this).attr('min')) );
						}
					}
					if($(this).attr('max')){
						if( Number($(this).val()) > Number($(this).attr('max')) ){
							$(this).val( Number($(this).attr('max')) );
						}
					}
				}
			}).focusout(function(){
				var exp = /^[0-9]+$/;
				if(!exp.test($(this).val()) && $(this).val() != ''){
					$(this).val('');
				}
				if($(this).val() != ''){					
					$(this).val(Number( $(this).val() ));					
					//숫자인 경우
					if($(this).attr('min')){
						if( Number($(this).val()) < Number($(this).attr('min')) ){
							$(this).val( Number($(this).attr('min')) );
						}
					}
					if($(this).attr('max')){
						if( Number($(this).val()) > Number($(this).attr('max')) ){
							$(this).val( Number($(this).attr('max')) );
						}
					}
				}
			});
		},
		fnOnlyAlpha : function(){	// 알파벳만 입력
			$(this).keyup(function(){ 
				var exp = /^[a-zA-Z]+$/;
				if(!exp.test($(this).val()) && $(this).val() != ''){
					if($(this).attr('fnOnlyAlphaMsg')){ alert($(this).attr('fnOnlyAlphaMsg')); }
					$(this).val('');
				}
			}).focusout(function(){
				var exp = /^[a-zA-Z]+$/;
				if(!exp.test($(this).val()) && $(this).val() != ''){
					$(this).val('');
				}			
			});
		},
		fnOnlyDecimal : function(){	// 숫자.만 입력
			$(this).keyup(function(){ 
				var exp = /^[0-9\.\-]+$/;
				if(!exp.test($(this).val()) && $(this).val() != ''){
					if($(this).attr('fnOnlyDecimalMsg')){ alert($(this).attr('fnOnlyDecimalMsg')); }
					$(this).val('');
				}
			}).focusout(function(){
				var exp = /^[0-9\.\-]+$/;
				if(!exp.test($(this).val()) && $(this).val() != ''){
					$(this).val('');
				}			
			});
		}
	});  
	

	/*!
 * jQuery UI SSSE selectbox 0.2
 */
	$.widget( "ui.ssse_selectmenu", $.ui.selectmenu, {
		options: {
			appendTo: null,
			disabled: null,
			icons: {
				//			ssse			
				//			button: "ui-icon-triangle-1-s"
				button: "ssw-icon"
			},
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			width: null,

			// callbacks
			change: null,
			close: null,
			focus: null,
			open: null,
			select: null,
			zIndex: 200
		},

		_drawMenu: function() {
			var that = this;

			// Create menu
			this.menu = $( "<ul>", {
				"aria-hidden": "true",
				"aria-labelledby": this.ids.button,
				id: this.ids.menu
			});

			// Wrap menu
			this.menuWrap = $( "<div>", {
				"class": "ui-selectmenu-menu ui-front ssw-ui-selectmenu-menu",
				"css": {
					"z-index": this.options.zIndex
				}
			})
				.append( this.menu )
				.appendTo( this._appendTo() );

			// Initialize menu widget
			this.menuInstance = this.menu
				.menu({
				role: "listbox",
				select: function( event, ui ) {
					event.preventDefault();

					// support: IE8
					// If the item was selected via a click, the text selection
					// will be destroyed in IE
					that._setSelection();

					that._select( ui.item.data( "ui-selectmenu-item" ), event );
				},
				focus: function( event, ui ) {
					var item = ui.item.data( "ui-selectmenu-item" );

					// Prevent inital focus from firing and check if its a newly focused item
					if ( that.focusIndex != null && item.index !== that.focusIndex ) {
						that._trigger( "focus", event, { item: item } );
						if ( !that.isOpen ) {
							that._select( item, event );
						}
					}
					that.focusIndex = item.index;

					that.button.attr( "aria-activedescendant",
																						that.menuItems.eq( item.index ).attr( "id" ) );
				}
			})
				.menu( "instance" );

			// Adjust menu styles to dropdown
			//		ssw
			//		this.menu
			//			.addClass( "ui-corner-bottom" )
			//			.removeClass( "ui-corner-all" );

			// Don't close the menu on mouseleave
//			this.menuInstance._off( this.menu, "mouseleave" );
			this.menu.mouseleave(function() {
				$('#'+this.id.split('-')[0]).ssse_selectmenu('close');
			});

			// Cancel the menu's collapseAll on document click
			this.menuInstance._closeOnDocumentClick = function() {
				return false;
			};

			// Selects often contain empty items, but never contain dividers
			this.menuInstance._isDivider = function() {
				return false;
			};
		},

		_drawButton: function() {
			var that = this,
							tabindex = this.element.attr( "tabindex" );

			// Associate existing label with the new button
			this.label = $( "label[for='" + this.ids.element + "']" ).attr( "for", this.ids.button );
			this._on( this.label, {
				click: function( event ) {
					this.button.focus();
					event.preventDefault();
				}
			});

			// Hide original select element
			this.element.hide();

			// Create button
			this.button = $( "<span>", {
				//			ssw			
				//			"class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
				"class": "ui-selectmenu-button ui-widget ui-state-default ssw-ui-selectmenu-button",
				tabindex: tabindex || this.options.disabled ? -1 : 0,
				id: this.ids.button,
				role: "combobox",
				"aria-expanded": "false",
				"aria-autocomplete": "list",
				"aria-owns": this.ids.menu,
				"aria-haspopup": "true"
			})
				.insertAfter( this.element );

			$( "<span>", {
				"class": "ui-icon " + this.options.icons.button
			})
				.prependTo( this.button );

			this.buttonText = $( "<span>", {
				"class": "ui-selectmenu-text"
			})
				.appendTo( this.button );

			this._setText( this.buttonText, this.element.find( "option:selected" ).text() );
			this._resizeButton();

			this._on( this.button, this._buttonEvents );
			this.button.one( "focusin", function() {

				// Delay rendering the menu items until the button receives focus.
				// The menu may have already been rendered via a programmatic open.
				if ( !that.menuItems ) {
					that._refreshMenu();
				}
			});
			this._hoverable( this.button );
			this._focusable( this.button );
		},
	});

})( jQuery );