package com.nantian.nfcm.bms.auth.entity;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "auth_info")
public class AuthInfo implements Serializable {
    private Long authId;
    private String authClass;
    private String authCn;
    private String serverPath;

    public AuthInfo() {
    }

    public AuthInfo(Long authId, String authClass, String authCn, String serverPath) {
        this.authId = authId;
        this.authClass = authClass;
        this.authCn = authCn;
        this.serverPath = serverPath;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_id")
    public Long getAuthId() {
        return authId;
    }

    public void setAuthId(Long authId) {
        this.authId = authId;
    }

    @Basic
    @Column(name = "auth_class")
    public String getAuthClass() {
        return authClass;
    }

    public void setAuthClass(String authClass) {
        this.authClass = authClass;
    }

    @Basic
    @Column(name = "auth_cn")
    public String getAuthCn() {
        return authCn;
    }

    public void setAuthCn(String anthCn) {
        this.authCn = anthCn;
    }

    @Basic
    @Column(name = "server_path")
    public String getServerPath() {
        return serverPath;
    }

    public void setServerPath(String serverPath) {
        this.serverPath = serverPath;
    }
}
