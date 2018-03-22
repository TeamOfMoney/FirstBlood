package com.nantian.nfcm.util.vo;

public class BaseNode
{
	private String id;
	private String text;
	private boolean leaf;
	private boolean expanded;
	
	public boolean isExpanded()
	{
		return expanded;
	}

	public void setExpanded(boolean expanded)
	{
		this.expanded = expanded;
	}

	public BaseNode()
	{
	}
	
	public BaseNode(String id,String text)
	{
		this.id = id;
		this.text = text;
	}
	
	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public String getText()
	{
		return text;
	}

	public void setText(String text)
	{
		this.text = text;
	}

	public boolean isLeaf()
	{
		return leaf;
	}

	public void setLeaf(boolean leaf)
	{
		this.leaf = leaf;
	}

}
