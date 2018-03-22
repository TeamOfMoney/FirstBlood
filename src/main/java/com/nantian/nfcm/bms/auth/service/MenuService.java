package com.nantian.nfcm.bms.auth.service;

import java.util.List;

import com.nantian.nfcm.bms.auth.vo.MenuTreeNode;
import com.nantian.nfcm.util.ServiceException;

public interface MenuService
{
	/**
	 * 获取菜单树
	 * @param menuIds
	 * @return MenuTreeNode 菜单树
	 */
	public MenuTreeNode getMenuTree(List<Long> menuIds) throws ServiceException;
	/**
	 * 获取菜单树
	 * @return MenuTreeNode 菜单树
	 */
	public MenuTreeNode getMenuTreeAll() throws ServiceException;
	/**
	 * 依据菜单节点Id查询菜单信息
	 * @param menuNodeId String 菜单节点Id
	 * @return MenuTreeNode
	 */
	public MenuTreeNode findMenuById(String menuNodeId) throws ServiceException;
	/**
	 * 新增菜单
	 * @param menuTreeNode MenuTreeNode menuTreeNode菜单信息
	 * @return MenuTreeNode
	 */
	public MenuTreeNode addMenu(MenuTreeNode menuTreeNode) throws ServiceException;
	/**
	 * 修改菜单
	 * @param menuTreeNode MenuTreeNode menuTreeNode菜单信息
	 * @return MenuTreeNode
	 */
	public MenuTreeNode updateMenu(MenuTreeNode menuTreeNode) throws ServiceException;
	/**
	 * 删除菜单
	 * @param menuTreeNode MenuTreeNode menuTreeNode菜单信息
	 */
	public void removeMenu(MenuTreeNode menuTreeNode) throws ServiceException;
}
