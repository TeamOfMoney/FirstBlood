package com.nantian.nfcm.util.vo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class LoginBean implements java.io.Serializable {
	private String userName;
	private String pwd;
	private String realName;
	private String clientIP;
	private String loginTime;
	private Long orgId;//所在机构ID
	private String orgPath="";//所在机构ID
	private String orgCode="";//所在机构编号
	private String orgName="";//所在机构名称
	private Map<Long, String> userAuthIds = new HashMap<Long, String>();
	private List<Long> menuTrees = new ArrayList<Long>();
	private List<Long> roleIds = new ArrayList<Long>();

	private int loginSatus; // ̬登录状态
	private String logId;

	public int getLoginSatus() {
		return loginSatus;
	}

	public void setLoginSatus(int loginSatus) {
		this.loginSatus = loginSatus;
	}

	public boolean rootAuthentication() {
		return ((loginTime != null) && (userName.equals("admin")));
	}

	public boolean authentication(String userName) {
		return ((this.loginTime != null) && (this.userName.equals(userName)));
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getClientIP() {
		return clientIP;
	}

	public void setClientIP(String clientIP) {
		this.clientIP = clientIP;
	}

	public String getLoginTime() {
		return this.loginTime;
	}

	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public Map<Long, String> getUserAuthIds() {
		return userAuthIds;
	}

	public void setUserAuthIds(Map<Long, String> userAuthIds) {
		this.userAuthIds = userAuthIds;
	}

	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	public List<Long> getMenuTrees() {
		return menuTrees;
	}

	public void setMenuTrees(List<Long> menuTrees) {
		this.menuTrees = menuTrees;
	}

	public List<Long> getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(List<Long> roleIds) {
		this.roleIds = roleIds;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getOrgPath() {
		return orgPath;
	}

	public void setOrgPath(String orgPath) {
		this.orgPath = orgPath;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	
	public boolean suAuthentication()
	{
		return((loginTime!=null) && (userName.equals("admin")));
	}
	
}