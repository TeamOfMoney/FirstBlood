package com.nantian.nfcm.bms.auth.vo;

import java.util.List;

import com.nantian.nfcm.bms.auth.entity.OrgInfo;
import com.nantian.nfcm.util.vo.TreeNode;

/**
 * 机构VO对象类
 */
public class OrgTreeNode extends TreeNode
{
	//private int accessType=BmsConst.ACCESS_ORTHER;//数据库处理方式
	private String parentId;
	private String parentOrgName;//父机构名称
	private String orgCode;
	private String oldOrgCode="";//以前的机构号
	private String orgAddr;
	private String orgManager;
	private String orgTelephone;
	private String orgPath;
	private String parentOrgCode;//父级的机构编码
	private String areaCode;
	private List<Long> orgIds;
	private List<String> orgCodes;
	
	
	public OrgTreeNode()
	{
	}

	public OrgTreeNode(OrgInfo orgInfo,boolean fullFlag)
	{
		syncOrgBasic(orgInfo);
	}

	public OrgTreeNode(OrgTreeNode orgTreeNode)
	{
		setId(orgTreeNode.getId());
		setText(orgTreeNode.getText());
		this.parentId=orgTreeNode.getParentId();
		this.orgCode = orgTreeNode.getOrgCode();
		this.orgAddr = orgTreeNode.getOrgAddr();
		this.orgManager = orgTreeNode.getOrgManager();
		this.orgTelephone = orgTreeNode.getOrgTelephone();
		this.orgPath = orgTreeNode.getOrgPath();
		this.parentOrgCode= orgTreeNode.getParentOrgCode();
		this.areaCode=orgTreeNode.getAreaCode();
	}

	public void syncOrgBasic(OrgInfo orgInfo)
	{
		setId(orgInfo.getOrgId()+"");
		setText(orgInfo.getOrgName());
		this.parentId = orgInfo.getParentId()+"";
		this.orgCode = orgInfo.getOrgCode();
		this.orgAddr = orgInfo.getOrgAddr();
		this.orgManager = orgInfo.getOrgManager();
		this.orgTelephone = orgInfo.getOrgTelephone();
		this.orgPath = orgInfo.getOrgPath();
		//this.parentOrgCode = orgInfo.getParentOrgCode();
		this.areaCode=orgInfo.getAreaCode();
	}
	
	/*public int getAccessType()
	{
		return accessType;
	}
	
	public void setAccessType(int accessType)
	{
		this.accessType = accessType;
	}*/
	
	public String getOrgAddr()
	{
		return orgAddr;
	}

	public void setOrgAddr(String orgAddr)
	{
		this.orgAddr = orgAddr;
	}

	public String getOrgManager()
	{
		return orgManager;
	}

	public void setOrgManager(String orgManager)
	{
		this.orgManager = orgManager;
	}

	public String getOrgTelephone()
	{
		return orgTelephone;
	}

	public void setOrgTelephone(String orgTelephone)
	{
		this.orgTelephone = orgTelephone;
	}

	public String getOrgCode()
	{
		return orgCode;
	}

	public void setOrgCode(String orgCode)
	{
		this.orgCode = orgCode;
	}
	
	public String getOldOrgCode()
	{
		return oldOrgCode;
	}

	public void setOldOrgCode(String oldOrgCode)
	{
		this.oldOrgCode = (oldOrgCode==null)?"":oldOrgCode;
	}

	public String getParentId()
	{
		return parentId;
	}

	public void setParentId(String parentId)
	{
		this.parentId = parentId;
	}
	
	public String getParentOrgName()
	{
		return parentOrgName;
	}

	public void setParentOrgName(String parentOrgName)
	{
		this.parentOrgName = parentOrgName;
	}
	
	public List<Long> getOrgIds()
	{
		return orgIds;
	}

	public void setOrgIds(List<Long> orgIds)
	{
		this.orgIds = orgIds;
	}
	
	public List<String> getOrgCodes()
	{
		return orgCodes;
	}

	public void setOrgCodes(List<String> orgCodes)
	{
		this.orgCodes = orgCodes;
	}
	public String getOrgPath()
	{
		return orgPath;
	}

	public void setOrgPath(String orgPath)
	{
		this.orgPath = orgPath;
	}

	public String getParentOrgCode() {
		return parentOrgCode;
	}

	public void setParentOrgCode(String parentOrgCode) {
		this.parentOrgCode = parentOrgCode;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
}