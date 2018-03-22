package com.nantian.nfcm.util.vo;

import java.util.List;

public class CheckTreeNode extends TreeNode
{
	boolean checked=false;
	
	public CheckTreeNode()
	{
	}
	
	public CheckTreeNode(String id,String text)
	{
		super(id,text);
	}

	public boolean isChecked()
	{
		return checked;
	}

	public void setChecked(boolean checked)
	{
		this.checked = checked;
	}
	
	public int childrenCheckNum()
	{
		int childernCheckNum=0;
		for(int i=0;i<children.size();i++)
		{
			if(((CheckTreeNode)children.get(i)).isChecked())
			{
				childernCheckNum+=1;
			}
		}
		return childernCheckNum;
	}
	
	public static CheckTreeNode convertTree(TreeNode treeNode,boolean expanded)
	{
		CheckTreeNode checkTreeNode=null;
		if(treeNode!=null)
		{
			checkTreeNode=new CheckTreeNode(treeNode.getId(),treeNode.getText());
			checkTreeNode.genChildCheckTree(treeNode, expanded);
		}
		return checkTreeNode;
	}
	
	private void genChildCheckTree(TreeNode treeNode,boolean expanded)
	{
		List<TreeNode> treeNodeList=treeNode.getChildren();
		if(treeNodeList!=null && treeNodeList.size()>0)
		{
			CheckTreeNode childCheckTreeNode=null;
			for(TreeNode childTreeNode : treeNodeList)
			{
				childCheckTreeNode=new CheckTreeNode(childTreeNode.getId(),childTreeNode.getText());
				addChildNode(childCheckTreeNode);
				childCheckTreeNode.genChildCheckTree(childTreeNode,expanded);
			}
			setExpanded(expanded);
		}
		else
		{
			setLeaf(true);
		}
	}

}