package com.nantian.nfcm.bms.auth.entity;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "role_info")
public class RoleInfo implements Serializable {
	protected Long roleId;
    protected String roleName;
    protected String roleDesc;
    protected String roleCreator;

    public RoleInfo() {
    }
    
    public RoleInfo(Long roleId,String roleName,String roleDesc,String roleCreator)
    {
    	this.roleId = roleId;
    	this.roleName = roleName;
    	this.roleDesc = roleDesc;
    	this.roleCreator = roleCreator;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "role_name")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "role_desc")
    public String getRoleDesc() {
        return roleDesc;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    @Basic
    @Column(name = "role_creator")
    public String getRoleCreator() {
        return roleCreator;
    }

    public void setRoleCreator(String roleCreator) {
        this.roleCreator = roleCreator;
    }
}
