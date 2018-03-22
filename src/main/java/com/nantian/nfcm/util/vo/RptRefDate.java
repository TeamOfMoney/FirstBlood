package com.nantian.nfcm.util.vo;

public class RptRefDate
{
	private String rptDate="";
	private String datDate="";
	private String rptNextStartDate="";
	public RptRefDate(String datDate,String rptDate,String rptNextStartDate)
	{
		this.datDate = datDate;
		this.rptDate = rptDate;
		this.rptNextStartDate = rptNextStartDate;
	}
	public String getRptDate()
	{
		return rptDate;
	}
	public void setRptDate(String rptDate)
	{
		this.rptDate = rptDate;
	}
	public String getDatDate()
	{
		return datDate;
	}
	public void setDatDate(String datDate)
	{
		this.datDate = datDate;
	}
	public String getRptNextStartDate()
	{
		return rptNextStartDate;
	}
	public void setRptNextStartDate(String rptNextStartDate)
	{
		this.rptNextStartDate = rptNextStartDate;
	}
	
}
