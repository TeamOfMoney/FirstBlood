package com.nantian.nfcm.util.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "bms_param")
public class Param implements Serializable {
	
	@Id
	@Column(name="param_name")
	private String paramName;
	
	@Column(name="param_value")
	private String paramValue;
	
	@Column(name="param_desc")
	private String paramDesc;

	// Constructors

	/** default constructor */
	public Param()
	{
	}

	/** minimal constructor */
	public Param(String paramName)
	{
		this.paramName = paramName;
	}

	/** full constructor */
	public Param(String paramName, String paramValue, String paramDesc)
	{
		this.paramName = paramName;
		setParamValue(paramValue);
		setParamDesc(paramDesc);
	}

	// Property accessors
	public String getParamName()
	{
		return this.paramName;
	}

	public void setParamName(String paramName)
	{
		this.paramName = paramName;
	}
	
	public String getParamValue()
	{
		return this.paramValue;
	}

	public void setParamValue(String paramValue)
	{
		this.paramValue = (paramValue!=null && paramValue.trim().length()>0)?paramValue:null;
	}
	
	public String getParamDesc()
	{
		return this.paramDesc;
	}

	public void setParamDesc(String paramDesc)
	{
		this.paramDesc = (paramDesc!=null && paramDesc.trim().length()>0)?paramDesc:null;
	}

}