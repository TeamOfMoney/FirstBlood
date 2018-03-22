package com.nantian.nfcm.bms.auth.entity;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "role_menu")
public class RoleMenu implements Serializable {

    private Long id;
    private Long roleId;
    private Long menuId;

    public RoleMenu() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "menu_id")
    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }
}
