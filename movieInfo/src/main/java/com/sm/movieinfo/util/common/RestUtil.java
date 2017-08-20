package com.sm.movieinfo.util.common;

import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;


public class RestUtil {
    private static Logger _logger = LoggerFactory.getLogger(RestUtil.class);
    private static final String ACCEPT = "Accept";
    private static final String CONTENT_TYPE= "Content-Type";
    private static final String REST_TEMPLATE_BEAN = "restTemplate";


    //create
    public static <T> T create(String url, Class<T> responseType, Object body) {
        return restRequest( url, HttpMethod.POST, responseType, body, null);
    }
    public static <T> T create(String url, Class<T> responseType, Object body, Map<String, String> vars) {
        return restRequest( url, HttpMethod.POST, responseType, body, vars);
    }
    
    //retrieve
    public static <T> T retrieve(String url, Class<T> responseType) {
        return restRequest( url, HttpMethod.GET, responseType, null, null);
    }
    public static <T> T retrieve(String url, Class<T> responseType, Map<String, String> vars) {
        return restRequest( url, HttpMethod.GET, responseType, null, vars);
    }
    
    //update
    public static <T> T update(String url, Class<T> responseType, Object body) {
        return restRequest( url, HttpMethod.PUT, responseType, body, null);
    }
    public static <T> T update(String url, Class<T> responseType, Object body, Map<String, String> vars) {
        return restRequest( url, HttpMethod.PUT, responseType, body, vars);
    }
    
    //delete
    public static <T> T delete(String url, Class<T> responseType, Object body) {
        return restRequest( url, HttpMethod.DELETE, responseType, body, null);
    }
    public static <T> T delete(String url, Class<T> responseType, Object body, Map<String, String> vars) {
        return restRequest( url, HttpMethod.DELETE, responseType, body, vars);
    }
    
    /**
     * Copy header attributes except 'accept' and 'content-type' attributes.
     * 
     * @return HttpHeaders
     */
    private static HttpHeaders setHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        
        try {
            HttpServletRequest req = CommonUtil.getCurrentRequest();
            Enumeration<?> e = req.getHeaderNames();
            
            while(e.hasMoreElements()){
                String name = (String)e.nextElement();
                
                if (!ACCEPT.equalsIgnoreCase(name) &&
                        !CONTENT_TYPE.equalsIgnoreCase(name)) {
                    headers.set(name, req.getHeader(name));
                    _logger.debug("name:{} value:{}", name, headers.get(name));
                }
            }
        } catch (Exception e) {
            _logger.debug("Current request is not a servlet request.");
        }

        headers.set(ACCEPT, MediaType.APPLICATION_JSON.toString());
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        _logger.debug("name:{} value:{}", ACCEPT, headers.get(ACCEPT));
        _logger.debug("name:{} value:{}", CONTENT_TYPE, headers.get(CONTENT_TYPE));
        

        return headers;
    }
    
    
    private static <T> T restRequest(String url, HttpMethod method, Class<T> responseType, Object body, Map<String, String> vars) {
        HttpEntity<?> requestEntity = null;
        T response = null;
        RestTemplate rest = (RestTemplate)AppContext.getBean(REST_TEMPLATE_BEAN);
           
        _logger.debug("[restRequest] method:{} uri:{}", method, url);
        
        if (body == null) {
            requestEntity = new HttpEntity<Object>(setHttpHeaders());
        }
        else {
            requestEntity = new HttpEntity<Object>(body, setHttpHeaders());
        }
        
        if (vars == null)
            response = rest.exchange(   url,
                    method,
                    requestEntity,
                    responseType).getBody();
        else {
            response = rest.exchange(   url,
                    method,
                    requestEntity,
                    responseType,
                    vars).getBody();
        }
        
        return response;
    }
}
