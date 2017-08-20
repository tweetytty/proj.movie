package com.sm.movieinfo.util.common;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Random;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonCodeUtil {
	/**
	 * Object -> Json 스트링으로 변환
	 * @param data
	 * @return
	 */
	public static String getJsonString(Object data){
		String tempDataToString	= null;
		try
		{
			tempDataToString	= new ObjectMapper().writeValueAsString(data);					
		}catch(Exception e){
			tempDataToString	= null;	
		}
		return tempDataToString;
	}
	
	/**
	 * Json 스트링으로 반환
	 * ( ObjectMapper 를 사용하지 않음, ObjectMapper Exception 발생시 사용할 목적 )
	 * @param resCode
	 * @param resMsg
	 * @param resMsgDev
	 * @param resUuid
	 * @param resVersion
	 * @param data
	 * @return
	 */
	public static String getJsonString(String resCode, String resMsg, String resMsgDev, String resUuid, String resVersion, Object data){
		StringBuffer sb	= new StringBuffer();			
		sb.append("{");

		if(resCode != null){
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESCODE).append(" \" : \"").append(resCode).append(" \"");
		}else{
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESCODE).append(" \" : null ");			
		}
		sb.append(",");
		
		if(resMsg != null){
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESMSG).append(" \" : \"").append(resMsg).append(" \"");
		}else{
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESMSG).append(" \" : null ");			
		}
		sb.append(",");
		
		if(resMsgDev != null){
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESMSGDEV).append(" \" : \"").append(resMsgDev).append(" \"");
		}else{
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESMSGDEV).append(" \" : null ");			
		}
		sb.append(",");

		if(resUuid != null){
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESUUID).append(" \" : \"").append(resUuid).append(" \"");
		}else{
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESUUID).append(" \" : null ");			
		}
		sb.append(",");
		
		if(resVersion != null){
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESVERSION).append(" \" : \"").append(resVersion).append(" \"");
		}else{
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESVERSION).append(" \" : null ");			
		}
		sb.append(",");

		try
		{
			String tempDataToString	= new ObjectMapper().writeValueAsString(data);
			if( tempDataToString != null && StringUtils.isNotEmpty(tempDataToString)){
				sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESVERSION).append(" \" : \"").append(tempDataToString).append(" \"");
			}else{
				sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESVERSION).append(" \" : null ");			
			}			
		}catch(Exception e){
			sb.append(" \"").append(JsonCode.DATA_COLUM_NAME_RESVERSION).append(" \" : null ");	
		}

		return sb.toString();		
	}
	

	/**
	 * JsonVo resUuid 값 설정 : YYYYMMdd_HHmmss_XXXX
	 * @return
	 */
	public static String getTimeStamp(){
		Random r			= new Random();
		int rValue			= r.nextInt(9999);
		DecimalFormat df 	= new DecimalFormat("0000");
		return new SimpleDateFormat("YYYYMMdd_HHmmss_").format(new java.util.Date())+df.format(rValue);
	}
}
