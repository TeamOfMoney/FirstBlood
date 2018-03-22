package com.nantian.nfcm.bms.auth.vo;

import com.nantian.nfcm.bms.auth.entity.AuthInfo;
import com.nantian.nfcm.bms.auth.entity.RoleInfo;
import com.nantian.nfcm.bms.auth.entity.UserInfo;

import java.util.ArrayList;
import java.util.List;

public class RoleBean extends RoleInfo {
    //TODO
    private String queryStartTime;
    private String queryEndTime;
    private List<AuthInfo> authInfos=new ArrayList<>();
    private List<Long> authIds;
	private List<Long> roleIds;
	private List<Long> menuIds;

    public RoleBean() {
    }

    public RoleBean(Long roleId, String roleName,String roleDesc,String roleCreator) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.roleDesc = roleDesc;
        this.roleCreator = roleCreator;
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

    

    public List<AuthInfo> getAuthInfos() {
        return authInfos;
    }

    public void setAuthInfos(List<AuthInfo> authInfos) {
        this.authInfos = authInfos;
    }

	public List<Long> getAuthIds() {
		return authIds;
	}

	public void setAuthIds(List<Long> authIds) {
		this.authIds = authIds;
	}

	public List<Long> getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(List<Long> roleIds) {
		this.roleIds = roleIds;
	}

	public List<Long> getMenuIds() {
		return menuIds;
	}

	public void setMenuIds(List<Long> menuIds) {
		this.menuIds = menuIds;
	}
    
    
}
