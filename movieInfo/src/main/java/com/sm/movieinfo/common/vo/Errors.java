package com.sm.movieinfo.common.vo;

public enum Errors {

    NO_ERROR(0, "success"),
    IS_ERROR(1, "fail"),

    COMMON_INVALID_REQUEST_PARAMETER(10001, "COMMON_INVALID_REQUEST_PARAMETER");
    
    private final int code;
    private final String desc;

    private Errors(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public int getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }

    @Override
    public String toString() {
        return code + ": " + desc;
    }
}
