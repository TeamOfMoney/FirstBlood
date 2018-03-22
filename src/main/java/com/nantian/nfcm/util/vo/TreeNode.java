package com.nantian.nfcm.util.vo;

import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
public class TreeNode extends BaseNode
{
	private Long nodeType;
	
	protected List children = new ArrayList();
	
	public TreeNode()
	{
	}
	
	public TreeNode(String id,String text)
	{
		super(id,text);
	}
	
	public Long getNodeType()
	{
		return this.nodeType;
	}
	
	public void setNodeType(Long nodeType)
	{
		this.nodeType = nodeType;
	}
	
	public void addChildNode(TreeNode treeNode)
	{
		children.add(treeNode);
		setLeaf(false);
	}
	
	public void removeChildNode(TreeNode treeNode)
	{
		TreeNode childNode;
		String nodeId=treeNode.getId();
		for(int i=0;i<children.size();i++)
		{
			childNode=(TreeNode)children.get(i);
			if(childNode.getId().equals(nodeId))
			{
				children.remove(i);
				if(children.size()==0)
				{
					setLeaf(true);
				}
				break;				
			}
		}
	}
	
	public int childrenSize()
	{
		return children.size();
	}

	public List getChildren()
	{
		return children;
	}

	public void setChildren(List children)
	{
		this.children = children;
	}
}
