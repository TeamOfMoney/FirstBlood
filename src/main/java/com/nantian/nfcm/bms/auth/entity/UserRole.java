package com.nantian.nfcm.bms.auth.entity;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "user_role")
public class UserRole implements Serializable {

    private Long id;
    private Long roleId;
    private String userName;

    public UserRole() {
    }

    public UserRole(Long roleId, String userName) {
        this.roleId = roleId;
        this.userName = userName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "role_id")
    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "user_name")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
