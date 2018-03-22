package com.nantian.nfcm.bms.auth.vo;

import java.util.ArrayList;
import java.util.List;

import com.nantian.nfcm.bms.auth.entity.AuthInfo;
import com.nantian.nfcm.bms.auth.entity.MenuTree;
import com.nantian.nfcm.util.vo.TreeNode;


public class MenuTreeNode extends TreeNode {
	private Long parentId;
	private String iconText;
	private String urlText;
	private Long orderFlag;
	private List<AuthInfo> authInfos = new ArrayList<AuthInfo>();

	public MenuTreeNode() {
	}

	public MenuTreeNode(MenuTree menuTree, boolean queryAllFlag) {
		syncMenuBasic(menuTree,queryAllFlag);
		setLeaf(true);
	}

	public void syncMenuBasic(MenuTree menuTree, boolean queryAllFlag) {
		setId(menuTree.getMenuId().toString());
		setParentId(menuTree.getParentId());
		setNodeType(menuTree.getNodeType());
		//if(queryAllFlag)
		//	setText(menuTree.getMenuText()+"["+menuTree.getOrderFlag()+"]");
		//else
			setText(menuTree.getMenuText());
		setIconText(menuTree.getIconText());
		setUrlText(menuTree.getUrlText());
		setParentId(menuTree.getParentId());
		if (authInfos == null) {
			authInfos = new ArrayList<AuthInfo>();
		}
		authInfos.clear();
		/*
		 * for(AuthorityInfo authorityInfo :
		 * (Set<AuthorityInfo>)menuTree.getAuthorityInfos()) {
		 * authorityCoreInfos.add(new AuthorityCoreInfo(authorityInfo)); }
		 */
	}

	public void syncMenuAuthority(List<AuthInfo> menuAuthorityCoreInfos) {
		if (authInfos == null) {
			authInfos = new ArrayList<AuthInfo>();
		}
		authInfos.clear();
		if (menuAuthorityCoreInfos != null) {
			authInfos.addAll(menuAuthorityCoreInfos);
		}
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getIconText() {
		return iconText;
	}

	public void setIconText(String iconText) {
		this.iconText = iconText;
	}

	public String getUrlText() {
		return urlText;
	}

	public void setUrlText(String urlText) {
		this.urlText = urlText;
	}

	public List<AuthInfo> getAuthInfos() {
		return authInfos;
	}

	public void setAuthInfos(List<AuthInfo> authInfos) {
		this.authInfos = authInfos;
	}

	public Long getOrderFlag() {
		return orderFlag;
	}

	public void setOrderFlag(Long orderFlag) {
		this.orderFlag = orderFlag;
	}

}
