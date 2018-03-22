package com.nantian.nfcm.bms.auth.vo;

import com.nantian.nfcm.bms.auth.entity.AuthInfo;
import com.nantian.nfcm.bms.auth.entity.RoleInfo;
import com.nantian.nfcm.bms.auth.entity.UserInfo;

import java.util.ArrayList;
import java.util.List;

public class UserBean extends UserInfo {
    //TODO
    private String queryStartTime;
    private String queryEndTime;
    private List<Long> roleIds;
	private String oldPwd;
	private String orgName;
	private String orgCode;
	private String orgPath;
    private List<Object> ownerRoles=new ArrayList<>();
    private List<Object> notOwnerRoles=new ArrayList<>();
    private List<AuthInfo> authInfos=new ArrayList<>();
    private List<RoleInfo> roleInfos = new ArrayList<RoleInfo>();

    public UserBean() {
    }

    public UserBean(String userName, String realName) {
        this.userName = userName;
        this.realName = realName;
    }

    public String getQueryStartTime() {
        return queryStartTime;
    }

    public void setQueryStartTime(String queryStartTime) {
        this.queryStartTime = queryStartTime;
    }

    public String getQueryEndTime() {
        return queryEndTime;
    }

    public void setQueryEndTime(String queryEndTime) {
        this.queryEndTime = queryEndTime;
    }

  

    public List<Object> getOwnerRoles() {
		return ownerRoles;
	}

	public void setOwnerRoles(List<Object> ownerRoles) {
		this.ownerRoles = ownerRoles;
	}

	public List<Object> getNotOwnerRoles() {
		return notOwnerRoles;
	}

	public void setNotOwnerRoles(List<Object> notOwnerRoles) {
		this.notOwnerRoles = notOwnerRoles;
	}

	public List<AuthInfo> getAuthInfos() {
        return authInfos;
    }

    public void setAuthInfos(List<AuthInfo> authInfos) {
        this.authInfos = authInfos;
    }

	public List<Long> getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(List<Long> roleIds) {
		this.roleIds = roleIds;
	}

	public List<RoleInfo> getRoleInfos() {
		return roleInfos;
	}

	public void setRoleInfos(List<RoleInfo> roleInfos) {
		this.roleInfos = roleInfos;
	}


	public String getOldPwd() {
		return oldPwd;
	}

	public void setOldPwd(String oldPwd) {
		this.oldPwd = oldPwd;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public String getOrgPath() {
		return orgPath;
	}

	public void setOrgPath(String orgPath) {
		this.orgPath = orgPath;
	}
	
	
    
}
