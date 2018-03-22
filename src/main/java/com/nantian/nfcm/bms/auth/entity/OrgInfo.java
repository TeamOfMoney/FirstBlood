package com.nantian.nfcm.bms.auth.entity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.nantian.nfcm.bms.auth.vo.OrgTreeNode;


@Entity
@Table(name = "org_info")
public class OrgInfo implements java.io.Serializable
{

	// Fields
	private Long orgId;
	private Long parentId;
	private String orgName;
	private String orgCode;//机构编码
	
	private String orgAddr;
	private String orgManager;
	private String orgTelephone;
	private String orgPath;
	private String areaCode;
	//申请编辑人
	private String editor;
	//审核人
	private String approver;
	//审核时间
	private String approvalTime;
	//最后编辑时间
	private String lastEditTime;
	//是否已经编辑标志
	private String editFlag;	
	//父机构名
	//private String parentOrgName;
	//private String parentOrgCode;
	//private Set devInfos = new HashSet(0);
	//private Set orgInfos = new HashSet(0);
	//private Set userInfos = new HashSet(0);

	// Constructors

	/** default constructor */
	public OrgInfo()
	{
	}
	
	public OrgInfo(OrgTreeNode orgTreeNode){
		setOrgId(Long.parseLong(orgTreeNode.getId()));
		setParentId(Long.parseLong(orgTreeNode.getParentId()));
		setOrgCode(orgTreeNode.getOrgCode());
		setOrgName(orgTreeNode.getText());
		setOrgManager(orgTreeNode.getOrgManager());
		setOrgPath(orgTreeNode.getOrgPath());
		setAreaCode(orgTreeNode.getAreaCode());
	}

	/** minimal constructor */
	public OrgInfo(Long orgId)
	{
		setOrgId(orgId);
	}
	
	/** normal constructor */
	public OrgInfo(Long orgId, Long parentId,
			String orgCode, String orgName, String orgAddr, String orgManager,
			String orgTelephone,String orgPath,String areaCode)
	{
		setOrgId(orgId);
		setParentId(parentId);
		setOrgCode(orgCode);
		setOrgName(orgName);
		setOrgAddr(orgAddr);
		setOrgManager(orgManager);
		setOrgTelephone(orgTelephone);
		setOrgPath(orgPath);
		setAreaCode(areaCode);
	}
	
	public OrgInfo(Long orgId, Long parentId, String orgCode,
			String orgName, String orgAddr,String orgManager, 
			String orgTelephone, String orgPath,
			String editor, String approver, String approvalTime,
			String lastEditTime, String editFlag,String areaCode) {
		this.orgId = orgId;
		this.parentId = parentId;
		this.orgName = orgName;
		this.orgCode = orgCode;
		this.orgAddr = orgAddr;
		this.orgManager = orgManager;
		this.orgTelephone = orgTelephone;
		this.orgPath = orgPath;
		this.editor = editor;
		this.approver = approver;
		this.approvalTime = approvalTime;
		this.lastEditTime = lastEditTime;
		this.editFlag = editFlag;
		this.areaCode=areaCode;
	}

	/** full constructor */
	/*public OrgInfo(String orgId, String parentId, String orgName,
			String orgCode, String parentOrgCode, String orgAddr,
			String orgManager, String orgTelephone,
			String orgPath, String editor, String approver,
			String approvalTime, String lastEditTime, String editFlag,
			Set orgInfos, Set userInfos) {
		this.orgId = orgId;
		this.parentId = parentId;
		this.orgName = orgName;
		this.orgCode = orgCode;
		this.parentOrgCode = parentOrgCode;
		this.orgAddr = orgAddr;
		this.orgManager = orgManager;
		this.orgTelephone = orgTelephone;
		this.orgPath = orgPath;
		this.editor = editor;
		this.approver = approver;
		this.approvalTime = approvalTime;
		this.lastEditTime = lastEditTime;
		this.editFlag = editFlag;
		this.orgInfos = orgInfos;
		this.userInfos = userInfos;
	}

	public OrgInfo(String orgId, String parentId, String orgName,
			String orgCode, String parentOrgCode, String orgAddr,
			String orgManager, String orgTelephone, String orgPath,
			String editor, String approver, String approvalTime,
			String lastEditTime, String editFlag, String parentOrgName,
			Set orgInfos, Set userInfos) {
		this.orgId = orgId;
		this.parentId = parentId;
		this.orgName = orgName;
		this.orgCode = orgCode;
		this.parentOrgCode = parentOrgCode;
		this.orgAddr = orgAddr;
		this.orgManager = orgManager;
		this.orgTelephone = orgTelephone;
		this.orgPath = orgPath;
		this.editor = editor;
		this.approver = approver;
		this.approvalTime = approvalTime;
		this.lastEditTime = lastEditTime;
		this.editFlag = editFlag;
		this.parentOrgName = parentOrgName;
		this.orgInfos = orgInfos;
		this.userInfos = userInfos;
	}*/

    @Id
    @Column(name = "org_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getOrgId()
	{
		return this.orgId;
	}
    public void setOrgId(Long orgId)
	{
		this.orgId = orgId;
	}
    
    @Basic
    @Column(name = "parent_id")
    public Long getParentId()
	{
		return this.parentId;
	}

	public void setParentId(Long parentId)
	{
		this.parentId = (parentId!=null)?parentId:null;
	}
	@Basic
    @Column(name = "org_name")
	public String getOrgName()
	{
		return this.orgName;
	}

	public void setOrgName(String orgName)
	{
		this.orgName = orgName;
	}
	@Basic
    @Column(name = "org_code")
	public String getOrgCode()
	{
		return orgCode;
	}

	public void setOrgCode(String orgCode)
	{
		this.orgCode = (orgCode!=null && orgCode.trim().length()>0)?orgCode:null;
	}
	@Basic
    @Column(name = "org_addr")
	public String getOrgAddr()
	{
		return this.orgAddr;
	}

	public void setOrgAddr(String orgAddr)
	{
		this.orgAddr = (orgAddr!=null && orgAddr.trim().length()>0)?orgAddr:null;
	}
	@Basic
    @Column(name = "org_manager")
	public String getOrgManager()
	{
		return this.orgManager;
	}

	public void setOrgManager(String orgManager)
	{
		this.orgManager = (orgManager!=null && orgManager.trim().length()>0)?orgManager:null;
	}
	@Basic
    @Column(name = "org_telephone")
	public String getOrgTelephone()
	{
		return this.orgTelephone;
	}

	public void setOrgTelephone(String orgTelephone)
	{
		this.orgTelephone = (orgTelephone!=null && orgTelephone.trim().length()>0)?orgTelephone:null;
	}
	@Basic
    @Column(name = "org_path")
	public String getOrgPath() {
		return orgPath;
	}

	public void setOrgPath(String orgPath) {
		this.orgPath = orgPath;
	}
	@Basic
    @Column(name = "editor")
	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}
	@Basic
    @Column(name = "approver")
	public String getApprover() {
		return approver;
	}

	public void setApprover(String approver) {
		this.approver = approver;
	}
	@Basic
    @Column(name = "approval_time")
	public String getApprovalTime() {
		return approvalTime;
	}

	public void setApprovalTime(String approvalTime) {
		this.approvalTime = approvalTime;
	}
	@Basic
    @Column(name = "last_edit_time")
	public String getLastEditTime() {
		return lastEditTime;
	}

	public void setLastEditTime(String lastEditTime) {
		this.lastEditTime = lastEditTime;
	}
	@Basic
    @Column(name = "edit_flag")
	public String getEditFlag() {
		return editFlag;
	}

	public void setEditFlag(String editFlag) {
		this.editFlag = editFlag;
	}
	@Basic
    @Column(name = "area_code")
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
	
	
	/*public String getParentOrgCode()
	{
		return parentOrgCode;
	}
	
	public void setParentOrgCode(String parentOrgCode)
	{
		this.parentOrgCode = (parentOrgCode!=null && parentOrgCode.trim().length()>0)?parentOrgCode:"";
	}
	
	public String getParentOrgName() {
		return parentOrgName;
	}

	public void setParentOrgName(String parentOrgName) {
		this.parentOrgName = parentOrgName;
	}*/
	/*public Set getOrgInfos()
	{
		return this.orgInfos;
	}

	public void setOrgInfos(Set orgInfos)
	{
		this.orgInfos = orgInfos;
	}

	public Set getUserInfos()
	{
		return this.userInfos;
	}

	public void setUserInfos(Set userInfos)
	{
		this.userInfos = userInfos;
	}*/

	

	
	
}