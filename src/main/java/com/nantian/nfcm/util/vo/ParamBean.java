package com.nantian.nfcm.util.vo;

import java.util.List;

import com.nantian.nfcm.util.entity.Param;

public class ParamBean extends Param {

	private List<String> paramNames;

	public List<String> getParamNames() {
		return paramNames;
	}

	public void setParamNames(List<String> paramNames) {
		this.paramNames = paramNames;
	}
	
	
}
