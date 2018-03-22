package com.nantian.nfcm.bms.auth.entity;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "menu_auth")
public class MenuAuth implements Serializable{
	
    private Long id;
    private Long menuId;
    private Long authId;

    public MenuAuth() {
	}
    
    public MenuAuth(Long id,Long menuId,Long authId)
    {
    	this.id=id;
    	this.menuId=id;
    	this.authId=id;
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
	@Column(name = "auth_id")
    public Long getAuthId() {
		return authId;
	}

	public void setAuthId(Long authId) {
		this.authId = authId;
	}
	
	@Basic
	@Column(name = "menu_id")
	public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }
}
