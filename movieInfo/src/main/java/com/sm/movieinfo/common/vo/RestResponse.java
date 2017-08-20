package com.sm.movieinfo.common.vo;

public class RestResponse {
    
    private int errorCode;
    private String errorMessage;
    private Object data = null;
    
    public RestResponse() {
        this.setError(Errors.NO_ERROR);
    }
    
    /**
     * @return the errorCode
     */
    public int getErrorCode() {
        return errorCode;
    }
    /**
     * @return the errorMessage
     */
    public String getErrorMessage() {
        return errorMessage;
    }
    /**
     * @return the data
     */
    public Object getData() {
        return data;
    }
    /**
     * @param data the data to set
     */
    public void setData(Object data) {
        this.data = data;
    }
    
    public void setError(Errors error) {
        this.errorCode = error.getCode();
        this.errorMessage = error.getDesc();
    }
}
