package com.nantian.nfcm.util.vo;

import java.util.List;

public class ResultInfo {
    private String promptMsg = "";
    private long number;
    private Object data = null;
    private Object extData = null;
    private Object mapData = null;
    private String success;
    private String error;
    private List errorkeys;

    private int page;
    private int totalPage;

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public String getPromptMsg() {
        return promptMsg;
    }

    public void setPromptMsg(String promptMsg) {
        this.promptMsg = promptMsg;
    }

    public Object getExtData() {
        return extData;
    }

    public void setExtData(Object extData) {
        this.extData = extData;
    }

    public Object getMapData() {
        return mapData;
    }

    public void setMapData(Object mapData) {
        this.mapData = mapData;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public List getErrorkeys() {
		return errorkeys;
	}

	public void setErrorkeys(List errorkeys) {
		this.errorkeys = errorkeys;
	}

	
	

	
    
}
