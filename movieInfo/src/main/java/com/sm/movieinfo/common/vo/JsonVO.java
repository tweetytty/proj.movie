package com.sm.movieinfo.common.vo;

import java.io.Serializable;
import java.util.HashMap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sm.movieinfo.util.common.JsonCode;
import com.sm.movieinfo.util.common.JsonCodeUtil;

public class JsonVO implements Serializable {

	private static final long serialVersionUID = 986173134858531362L;
	/**
	 * 응답 코드
	 */
	String resCode;
	/**
	 * 응답 메세지
	 */
	String resMsg;
	/**
	 * 응답 메세지(개발자 대상)
	 */
	String resMsgDev;
	/**
	 * 통신 PK ( timestamp: YYYYMMdd_HHmmss_XXXX / Local 시간 기준)
	 */
	String resUuid;
	/**
	 * 통신 버전 ( 수신측에서 전송해오는 통신 버전 CallBack )
	 */
	String resVersion;
	/**
	 * 응답 Body :  Object형 or HashMap형 하나만 쓸수 있음
	 */
	Object data;

	public JsonVO(){
		this.resCode	= JsonCode.RESCODE_SUCCESS;
		this.resMsg		= null;
		this.resMsgDev	= null;
		this.resVersion	= null;
		this.data		= null;
		this.resUuid	= JsonCodeUtil.getTimeStamp();
		//this.resUuid	= UUID.randomUUID().toString();
	}
	public JsonVO(String resVersion){
		this(resVersion, null , null, null);
	}
	public JsonVO(String resVersion,String resCode){
		this(resVersion, resCode, null, null);
	}
	public JsonVO(String resVersion,String resCode, String resMsg){
		this(resVersion, resCode, resMsg, null);
	}
	public JsonVO(String resVersion,String resCode, String resMsg, String resMsgDev){
		this();
		this.resCode	= resCode;
		this.resVersion	= resVersion;
		this.resMsg		= resMsg;
		this.resMsgDev	= resMsgDev;
	}
	
	@Override
	public String toString() {
		return "JsonVO [\n\tresCode=" + resCode + "\n, \tresMsg=" + resMsg
				+ "\n, \tresMsgDev=" + resMsgDev + "\n, \tresUuid=" + resUuid
				+ "\n, \tresVersion=" + resVersion + "\n, \tdata=" + data
				+ "\n]";
	}
	
	/**
	 * Json 메세지 응답
	 * @return
	 */
	public String toJson() {
		String result 	= "{}";
		try{
			result 		=  new ObjectMapper().writeValueAsString(this); 
		}catch(Exception e){
			result		= JsonCodeUtil.getJsonString( JsonCode.RESCODE_FAIL_RESPONSE_CONVERSION_ERROR,  resMsg,  e.getMessage().replaceAll("\"",""),  resUuid,  resVersion,  data);
		}
		return result;  
	}
	
	
	
	/**
	 * Object형 데이터를 HashMap 형태로 쓸때
	 * Object형 or HashMap형 하나만 쓸수 있음
	 * @param key
	 * @param obj
	 */
	public void setData(String key,Object obj){
		if(this.data == null){
			this.data		= new HashMap<String,Object>();
		}
		((HashMap<String,Object>)this.data).put(key, obj);	
	}
	
	public Object getData(String key){
		Object obj 	= null;
		if(this.data != null && this.data.getClass().getSimpleName().equals("HashMap")){
			obj		= ((HashMap<String,Object>)this.data).get(key);
		}
		return obj;
	}
	
	
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
	
	public String getResCode() {
		return resCode;
	}
	public void setResCode(String resCode) {
		this.resCode = resCode;
	}
	public String getResMsg() {
		return resMsg;
	}
	public void setResMsg(String resMsg) {
		this.resMsg = resMsg;
	}
	public String getResMsgDev() {
		return resMsgDev;
	}
	public void setResMsgDev(String resMsgDev) {
		this.resMsgDev = resMsgDev;
	}
	public String getResUuid() {
		return resUuid;
	}
	public void setResUuid(String resUuid) {
		this.resUuid = resUuid;
	}
	public String getResVersion() {
		return resVersion;
	}
	public void setResVersion(String resVersion) {
		this.resVersion = resVersion;
	}
}
