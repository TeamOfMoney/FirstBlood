package com.nantian.nfcm.bms.auth.entity;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "role_auth")
public class RoleAuth implements Serializable {
    private Long id;
    private Long roleId;
    private Long authId;

    public RoleAuth() {
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
    @Column(name = "auth_id")
    public Long getAuthId() {
        return authId;
    }

    public void setAuthId(Long authId) {
        this.authId = authId;
    }
}
