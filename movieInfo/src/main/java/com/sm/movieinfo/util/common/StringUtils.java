package com.sm.movieinfo.util.common;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.text.CharacterIterator;
import java.text.StringCharacterIterator;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

public class StringUtils extends org.apache.commons.lang.StringUtils{
	private static final Logger logger = LoggerFactory.getLogger(StringUtils.class);
	
    public static final String EMPTY_STRING = "";
    private static final String SPACE = " ";
    private static final String ELLIPSIS = "...";
    private static final String CharSet_UTF8 = "UTF-8";

    protected StringUtils()
    {
    }

    /**
     * Checks whether a given String has a valid content or not.
     * Empty spaces are not treated as a valid content for a String.
     *
     * @param str
     * @return whether String has a valid content or not
     */
    public static boolean isEmpty(String str)
    {
        return (str == null || str.trim().equals(""));
    }

    /**
     * Tokenises a String based on a delimiter and returns the tokens in an Array.
     *
     * @param string
     * @param token
     * @return String Array
     */
    public static String[] toStringArray(String string,String token)
    {
        if(string == null || token == null)
            throw new IllegalArgumentException("String / Delimiter cannot be null");
        StringTokenizer tokenizer = new StringTokenizer(string,token);
        String[] stringArray = new String[tokenizer.countTokens()];
        int count = 0;
        while(tokenizer.hasMoreElements())
        {
            stringArray[count++] = tokenizer.nextToken();
        }
        return stringArray;
    }

    /**
     * Tokenises a String based on the default delimiter(',') and returns the tokens in an Array.
     *
     * @param string
     * @return String Array
     */
    public static String[] toStringArray(String string)
    {
        return toStringArray(string,",");
    }

    /**
     * Converts a String to a char type
     * The length of the String must not be greates that one.
     * @param string
     * @return
     */
    public static char toChar(String string)
    {
        if(string == null || string.length() != 1)
            throw new IllegalArgumentException("String needs to have a single character");
        return string.charAt(0);
    }

    /**
     * Converts a char to a String
     *
     * @param c
     * @return
     */
    public static String toString(char c)
    {
        return new String(new char[]{c});
    }

    public static String capitalize(String target){
        if(isEmpty(target))
            return null;
        return Character.toUpperCase(target.charAt(0)) + target.substring(1);
    }

    /**
     * @param regex
     * @param targetString
     * @return The result of String.split(regex) except that 
     * Trailing empty strings are included in the resulting array
     */
    public static String[] split(String regex , String targetString ) {
        if(targetString!=null) {
            if(targetString.endsWith(regex)) {
                if(!regex.equals("1")) 
                    targetString+="1";
                else 
                    targetString+="2";
                String [] result = targetString.split(regex);
                result[result.length-1] = "";
                return result;
            }else {
                return targetString.split(regex);
            }
        } else {
            return null;
        }
    }
    /**
     * Returns a String with newline added between the content
     * e.g.: if the content is content={"Hi There, ", "I'm fine.", "Thanks,", "Partha"}, the returned String would be:
     * Hi There,
     * I'm fine
     * Thanks,
     * Partha
     * @param content, chunks of text that need to be separated by newline
     * @return
     */
    public static String formatTextWithNewLine(String[] content)  {
        try{
            StringWriter sw = new StringWriter(20);
            BufferedWriter bf = new BufferedWriter(sw);
            for (int i = 0; i < content.length; i++) {
                bf.write(content[i]);
                bf.newLine();
            }
            bf.close();
            String formattedText = sw.getBuffer().toString();
            return formattedText;
        }catch(IOException ioe){
            ioe.printStackTrace();
            return EMPTY_STRING;
        }
    }

    public static String toDelimiterSeparatedString(String[] array, String delimiter) {
        StringBuffer expression = new StringBuffer(32);
        for (int i = 0; i < array.length; i++) {
            if(!isEmpty(array[i])){
                expression.append(array[i]);
                expression.append(delimiter);
            }

        }
        //Delete the extra "'" character at the end
        if(expression.length() > 2) expression.deleteCharAt(expression.length() - 1);
        return expression.toString();
    }

    /**
     * Checks whether a string has digits
     * @param s
     * @return
     */
    public static boolean hasDigit(String s){
        for(int i = 0; i < s.length(); i++){
            if(Character.isDigit(s.charAt(i)))
                return true;
        }
        return false;
    }

    public static long toLong(String s){
        if (isEmpty(s)) return 0;

        try {
            return Long.parseLong(s);
        } catch (Exception ex) {
            return 0;
        }
    }

    public static String getStringFromInputStream(InputStream is) {

        String line = null;
        StringBuffer buffer = new StringBuffer();
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(is));
            while ((line = in.readLine()) != null) {
                buffer.append(line+"\r\n");
            }
            //return new BufferedReader(new StringReader(buffer.toString()));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return  buffer.toString();
    }

    public static boolean decodeInd(String s) {
        return decodeInd(s, "Y");
    }

    public static boolean decodeInd(String s, String trueInd) {

        if (s == null)
            return false;
        else if (trueInd.equals(s.trim()))
            return true;
        else
            return false;
    }


    /*
	public static String encodeInd(String s) {
		return encodeInd(s, "Y", "N");
	}

	public static String encodeInd(String s, String trueInd, String falseInd) {
		if (s==null)
			return trueInd;
		else
			return falseInd;
	}
     */

    public static String encodeInd(boolean b) {
        return encodeInd(b, "Y", "N");
    }

    public static String encodeInd(boolean b, String trueInd, String falseInd) {
        if (b)
            return trueInd;
        else
            return falseInd;
    }

    public static String toJSonString(String javaString) {
        String jsonString="";
        try {
            jsonString = javaString
            .replaceAll("\n", "\\n")
            .replaceAll("\b", "\\b")
            .replaceAll("\t", "\\t")
            .replaceAll("\f", "\\f")
            .replaceAll("\r", "\\r")
            .replaceAll("\"", "\\\"");
        }
        catch(Exception e){
            jsonString = "";
        }
        return jsonString;
    }

    /**
     * Truncate input string.
     * 
     * @param   s
     *          input string
     *          
     * @param   nBytes
     *          output string length without ellipsis
     *          
     * @return  String
     *          output string
     * @exception Exception
     */
    public static String truncate(String s, int nBytes) {
        if (s == null || s.length() == 0)
          return ELLIPSIS;

        int len = s.length();
        int outputBytes=0, offset=0;

        for (int i = 0; i < len; i++) {
            int c = s.charAt(i) & 0xFFFFFF;
            if (c <= 0x007F) {
                if ((outputBytes+1) > nBytes) break;
                offset++;
                outputBytes++;
            }
            else if (c <= 0x07FF) {
                if ((outputBytes+2) > nBytes) break;
                offset += 2;
                outputBytes += 2;
            }
            else if (c <= 0xFFFF) {
                if ((outputBytes+2) > nBytes) break;
                offset += 3;
                outputBytes += 2;
            }
            else if (c <= 0x10FFFF) {
                if ((outputBytes+2)> nBytes) break;
                offset += 4;
                outputBytes += 2;
            }
        }
        
        try {
            byte[] bytes = s.getBytes(CharSet_UTF8);
            return new String(bytes, 0, offset, CharSet_UTF8).concat(ELLIPSIS);
            
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        
        return ELLIPSIS;
      }

    public static String toDisableTags(String aText){
	    final StringBuilder result = new StringBuilder();
	    final StringCharacterIterator iterator = new StringCharacterIterator(aText);
	    char character =  iterator.current();
	    while (character != CharacterIterator.DONE ){
	      if (character == '<') {
	        result.append("&lt;");
	      }
	      else if (character == '>') {
	        result.append("&gt;");
	      }
	      else {
	        //the char is not a special one
	        //add it to the result as is
	        result.append(character);
	      }
	      character = iterator.next();
	    }
	    return result.toString();
	  }
    
    
    
    
    public static String forHTML(String aText){
	     final StringBuilder result = new StringBuilder();
	     final StringCharacterIterator iterator = new StringCharacterIterator(aText);
	     char character =  iterator.current();
	     while (character != CharacterIterator.DONE ){
	       if (character == '<') {
	         result.append("&lt;");
	       }
	       else if (character == '>') {
	         result.append("&gt;");
	       }
	       else if (character == '&') {
	         result.append("&amp;");
	      }
	       else if (character == '\"') {
	         result.append("&quot;");
	       }
	       else if (character == '\t') {
	         addCharEntity(9, result);
	       }
	       else if (character == '!') {
	         addCharEntity(33, result);
	       }
	       else if (character == '#') {
	         addCharEntity(35, result);
	       }
	       else if (character == '$') {
	         addCharEntity(36, result);
	       }
	       else if (character == '%') {
	         addCharEntity(37, result);
	       }
	       else if (character == '\'') {
	         addCharEntity(39, result);
	       }
	       else if (character == '(') {
	         addCharEntity(40, result);
	       }
	       else if (character == ')') {
	         addCharEntity(41, result);
	       }
	       else if (character == '*') {
	         addCharEntity(42, result);
	       }
	       else if (character == '+') {
	         addCharEntity(43, result);
	       }
	       else if (character == ',') {
	         addCharEntity(44, result);
	       }
	       else if (character == '-') {
	         addCharEntity(45, result);
	       }
	       else if (character == '.') {
	         addCharEntity(46, result);
	       }
	       else if (character == '/') {
	         addCharEntity(47, result);
	       }
	       else if (character == ':') {
	         addCharEntity(58, result);
	       }
	       else if (character == ';') {
	         addCharEntity(59, result);
	       }
	       else if (character == '=') {
	         addCharEntity(61, result);
	       }
	       else if (character == '?') {
	         addCharEntity(63, result);
	       }
	       else if (character == '@') {
	         addCharEntity(64, result);
	       }
	       else if (character == '[') {
	         addCharEntity(91, result);
	       }
	       else if (character == '\\') {
	         addCharEntity(92, result);
	       }
	       else if (character == ']') {
	         addCharEntity(93, result);
	       }
	       else if (character == '^') {
	         addCharEntity(94, result);
	       }
	       else if (character == '_') {
	         addCharEntity(95, result);
	       }
	       else if (character == '`') {
	         addCharEntity(96, result);
	       }
	       else if (character == '{') {
	         addCharEntity(123, result);
	       }
	       else if (character == '|') {
	         addCharEntity(124, result);
	       }
	       else if (character == '}') {
	         addCharEntity(125, result);
	       }
	       else if (character == '~') {
	         addCharEntity(126, result);
	       }
	       else {
	         //the char is not a special one
	         //add it to the result as is
	         result.append(character);
	       }
	       character = iterator.next();
	     }
	     return result.toString();
	  }
    
    public static String forJSON(String aText){
	    final StringBuilder result = new StringBuilder();
	    StringCharacterIterator iterator = new StringCharacterIterator(aText);
	    char character = iterator.current();
	    while (character != StringCharacterIterator.DONE){
	      if( character == '\"' ){
	        result.append("\\\"");
	      }
	      else if(character == '\\'){
	        result.append("\\\\");
	      }
	      else if(character == '/'){
	        result.append("\\/");
	      }
	      else if(character == '\b'){
	        result.append("\\b");
	      }
	      else if(character == '\f'){
	        result.append("\\f");
	      }
	      else if(character == '\n'){
	        result.append("\\n");
	      }
	      else if(character == '\r'){
	        result.append("\\r");
	      }
	      else if(character == '\t'){
	        result.append("\\t");
	      }
	      else {
	        //the char is not a special one
	        //add it to the result as is
	        result.append(character);
	      }
	      character = iterator.next();
	    }
	    return result.toString();    
    }

    public static String forXML(String aText){
	    final StringBuilder result = new StringBuilder();
	    final StringCharacterIterator iterator = new StringCharacterIterator(aText);
	    char character =  iterator.current();
	    while (character != CharacterIterator.DONE ){
	      if (character == '<') {
	        result.append("&lt;");
	      }
	      else if (character == '>') {
	        result.append("&gt;");
	      }
	      else if (character == '\"') {
	        result.append("&quot;");
	      }
	      else if (character == '\'') {
	        result.append("&#039;");
	      }
	      else if (character == '&') {
	         result.append("&amp;");
	      }
	      else {
	        //the char is not a special one
	        //add it to the result as is
	        result.append(character);
	      }
	      character = iterator.next();
	    }
	    return result.toString();
	  }
    
    
    
    private static void addCharEntity(Integer aIdx, StringBuilder aBuilder){
	    String padding = "";
	    if( aIdx <= 9 ){
	       padding = "00";
	    }
	    else if( aIdx <= 99 ){
	      padding = "0";
	    }
	    else {
	      //no prefix
	    }
	    String number = padding + aIdx.toString();
	    aBuilder.append("&#" + number + ";");
	  }
    
	
	
	/**
	 * 개체를 Json string으로 변환 작업
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public static String getObjectToJsonString(Object obj) throws Exception{		
		return new ObjectMapper().writeValueAsString(obj);
	}
	
	/**
     * 요청 JSON Type 로깅을 위해서 작성함
     * @param request
     * @return
     * @throws IOException
     */
    public static String getBody(HttpServletRequest request){    	 
        String body = null;
        
        InputStream is	= null;
        try {
        	//body 	=  IOUtils.toString(new InputStreamReader(request.getInputStream()));        	
        	is		= request.getInputStream();
        	body 	=  IOUtils.toString(is,"UTF-8");
        } catch (Exception ex) {
        	body	+= ex.getMessage();
        	logger.error("IOException close faile : "+ex.getMessage());
        }finally{
        	if(is != null){
        		IOUtils.closeQuietly(is);
        	}        		
        }
        
        /*
        //하위 주석 섹션 지우지 말아주세요. (테스트 진행 중)
        
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;
 
        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[1024];
                int bytesRead = -1;
             
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            }            
        } catch (Exception ex) {
        	//body	= ex.getMessage();
         	logger.error("IOException close faile : "+ex.getMessage());
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                	logger.error("IOException close faile : "+ex.getMessage());
                }
            }
        }
        body = stringBuilder.toString();
        */
        
        return body;
    }	
    
    
    /**
     * 범위 값중에 있는지를 검사하여, 범위 리스트 중에 없으면 defaultValue로 변환함<br/>
     * 페이지 count 가 범위 내에 있는지 체크 할때 사용됨.
     * @param target
     * @param range
     * @param defaultValue
     * @return
     */
    public static int getAllowedRange(int target,int[] range, int defaultValue){    	 
    	int result = target;
    	try{
    		boolean exist = false;
    		for(int i : range ){
    			if( i == target ){
    				exist = true;
    				break;
    			}
    		}
    		if(!exist){
    			result = defaultValue;
    		}
    	}catch(Exception e){
    		target = defaultValue;
    	}
    	return result;
    }
}
