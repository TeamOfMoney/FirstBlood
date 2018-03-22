package com.nantian.nfcm.bms.auth.entity;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "menu_tree")
public class MenuTree implements Serializable {
    private Long menuId;
    private Long parentId;
    private String menuText;
    private String iconText;
    private Long nodeType;
    private String urlText;
    private Long orderFlag;

    public MenuTree() {
    }

    public MenuTree(Long menuId, Long parentId, String menuText,
                    String iconText, Long nodeType, String urlText, Long orderFlag) {
        this.menuId = menuId;
        this.parentId = parentId;
        this.menuText = menuText;
        this.iconText = iconText;
        this.nodeType = nodeType;
        this.urlText = urlText;
        this.orderFlag = orderFlag;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "parent_id")
    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    @Basic
    @Column(name = "menu_text")
    public String getMenuText() {
        return menuText;
    }

    public void setMenuText(String menuText) {
        this.menuText = menuText;
    }

    @Basic
    @Column(name = "icon_text")
    public String getIconText() {
        return iconText;
    }

    public void setIconText(String iconText) {
        this.iconText = iconText;
    }

    @Basic
    @Column(name = "node_type")
    public Long getNodeType() {
        return nodeType;
    }

    public void setNodeType(Long nodeType) {
        this.nodeType = nodeType;
    }

    @Basic
    @Column(name = "url_text")
    public String getUrlText() {
        return urlText;
    }

    public void setUrlText(String urlText) {
        this.urlText = urlText;
    }

    @Basic
    @Column(name = "order_flag")
    public Long getOrderFlag() {
        return orderFlag;
    }

    public void setOrderFlag(Long orderFlag) {
        this.orderFlag = orderFlag;
    }
}
