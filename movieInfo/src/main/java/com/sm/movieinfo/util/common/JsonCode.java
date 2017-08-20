package com.sm.movieinfo.util.common;

/**----------------------------------------------------
 *          코드 응답 코드 포멧
 * ---------------------------------------------------- 
 * [코드 기본 타입]
 * 		1		성공
 * 		0xxxx	실패
 * 
 * [대분류 타입]
 * 		01xxx	클라이언트 측 에러
 * 		02xxx	업무에서 체크 로직 등에서 반환하는 에러
 * 
 * 
 * 
 * 
 * 		07xxx	서버 측 에러		<--- 개발측에서 감지 해야되는 내용 관련( 내부 Exception 등등, 별도의 07xxx 모니터링 등록 예정)
 * 		08xxx	클라이언트에게 송신해야되는 데이터 및 에러
 * 		09xxx	서버 관련 에러(HTTP통신 오류)
 */
public class JsonCode {
	/**
	 * resCode 응답 : 성공
	 */
	public static final String RESCODE_SUCCESS							= "1";	
	
	
	/**
	 * resCode 응답 : 실패(상세 사유 없음)
	 */
	public static final String RESCODE_FAIL								= "01000";
	/**
	 * resCode 응답 : 라이센스 파일이 없거나 부적합한 경우
	 */
	public static final String RESCODE_FAIL_INVALID_LICENSE				= "01010";
	/**
	 * resCode 응답 : 라이센스 파일이 없거나 부적합한 경우
	 */
	public static final String RESCODE_FAIL_EXPIRED_LICENSE				= "01020";
	/**
	 * resCode 응답 : 라이센스 파일이 기간 만료
	 */
	public static final String RESCODE_FAIL_PERIOD_EXPIRED_LICENSE		= "01025";
	/**
	 * resCode 응답 : ID,PASSWORD로 사용자를 못찾을때
	 */
	public static final String RESCODE_FAIL_NOT_FOUND_USER				= "01030";	
	/**
	 * resCode 응답 : 미 인증 회원
	 */
	public static final String RESCODE_FAIL_NOT_APPROVED_USER			= "01040";	
	/**
	 * resCode 응답 : 거절된 회원
	 */
	public static final String RESCODE_FAIL_REJECTED_USER				= "01050";	
	/**
	 * resCode 응답 : 로그인 회원
	 */
	public static final String RESCODE_FAIL_LOGIN_DELETED_USER				= "01060";	

	
	/**
	 * resCode 응답 : 헤더값 점검 오류
	 */
	public static final String RESCODE_FAIL_HEADER						= "02000";
	/**
	 * resCode 응답 : 실패 ( 파라메터 값 오류, 마샬링 에러관련은 별도 처리)
	 */
	public static final String RESCODE_FAIL_PARAM						= "02010";
	/**
	 * resCode 응답 : 실패 ( 세션은 존재하나, 기능에 대한 사용 권한 없음 )
	 */
	public static final String RESCODE_NO_PERMISSION					= "02030";
	/**
	 * resCode 응답 : 실패 ( 해당 기능에 대한 실행 권한 없음 )
	 */
	public static final String RESCODE_FAIL_FN_UNAUTHORIZED				= "02040";
	/**
	 * resCode 응답 : 실패 ( 로그인 사용자의 권한이 하나도 없음 )
	 */
	public static final String RESCODE_FAIL_ROLE_DOES_NOT_EXIST			= "02050";
	/**
	 * resCode 응답 : 실패 -승인시 사용됨(플레이어 등록 대수 초과)
	 */
	public static final String RESCODE_FAIL_REGISTRATION_NUMBER_EXCEEDED_PLAYER = "02060";

	/**
	 * resCode 응답 :개발자별 에러 처리
	 * 				각종 Exception 및 비즈니스 로직상 에러를 처리할때 사용함
	 * 				data, resMsgDev 의 값등 개발자별로 처리하여 사용함
	 */
	public static final String RESCODE_FAIL_SERVER_SIDE					= "07000";			
	/**
	 * resCode 응답 : 응답 포멧 변환 중 에러(서버측에서 발생하는 에러)
	 */
	public static final String RESCODE_FAIL_RESPONSE_CONVERSION_ERROR	= "07100";
	/**
	 * RSA key 발급에 문제가 발생되는 경우
	 */
	public static final String RESCODE_FAIL_RSA_PRIVATE_KEY				= "07200";		
	/**
	 * 업로드 용량 사이즈 초과
	 */
	public static final String RESCODE_FAIL_EXCEEDING_SIZE				= "07300";		

	/**
	 * resCode 응답 : resMsg 고객측에 전송 (각종 공지 및 전달 사항)
	 * ( JsonVO.getResMsg() 를 alert로 표시함)
	 */
	public static final String RESCODE_FAIL_ALERT_TO_CLIENT				= "08000";
	/**
	 * resCode 응답 : data:url 	로 forward 시키는 작업 케이스
	 */
	public static final String RESCODE_FAIL_FORWARD						= "08100";	
	
	
	
	
	/**
	 * resCode 응답 : 실패 ( 세션이 없는 경우 )
	 */
	public static final String RESCODE_FAIL_UNAUTHORIZED				= "09401";	
	
	
	
	
	/**
	 * 응답 JSON 데이터 컬럼명 : resCode
	 */
	public static final String DATA_COLUM_NAME_RESCODE					= "resCode";
	/**
	 * 응답 JSON 데이터 컬럼명 : resMsg
	 */
	public static final String DATA_COLUM_NAME_RESMSG					= "resMsg";
	/**
	 * 응답 JSON 데이터 컬럼명 : resMsgDev
	 */
	public static final String DATA_COLUM_NAME_RESMSGDEV				= "resMsgDev";
	/**
	 * 응답 JSON 데이터 컬럼명 : resUuid
	 */
	public static final String DATA_COLUM_NAME_RESUUID					= "resUuid";
	/**
	 * 응답 JSON 데이터 컬럼명 : resVersion
	 */
	public static final String DATA_COLUM_NAME_RESVERSION				= "resVersion";
	/**
	 * 응답 JSON 데이터 컬럼명 : data
	 */
	public static final String DATA_COLUM_NAME_DATA						= "data";
	

	/**
	 * HEADER에 version 값을 체크하는 String key 값
	 */
	public static final String STRING_HEADER_VERSION					= "Rest-Version";
	/**
	 * HEADER에 Client 타입을 체크하는 String key 값
	 */
	public static final String STRING_HEADER_CLIENT_TYPE				= "Client-Type";
	/**
	 * HEADER에 Accept 타입을 체크하는 String key 값
	 */
	public static final String STRING_HEADER_ACCEPT						= "Accept";
	/**
	 * HEADER에 Accept 타입을 byPass 하는 String : Accept=application/json
	 */
	public static final String STRING_HEADER_ACCEPT_APPLICATION_JSON	= "Accept=application/json";
	/**
	 * HEADER에 Accept 타입을 byPass 하는 String : content-type=multipart/form-data
	 */
	public static final String STRING_HEADER_ACCEPT_MULTIPART_FORM_DATA	= "content-type=multipart/form-data";
	
	/**
	 * API 서버의 로그인시 발생하는 Session.getId() , Client 서버를 경유하여 API를 접근시 사용.
	 */
	public static final String STRING_API_SESSION_KEY					= "API_SSKEY";
}
