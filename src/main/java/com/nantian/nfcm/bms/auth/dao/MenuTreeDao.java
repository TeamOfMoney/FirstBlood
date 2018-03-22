package com.nantian.nfcm.bms.auth.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.nantian.nfcm.bms.auth.entity.MenuTree;

public interface MenuTreeDao extends JpaRepository<MenuTree, Long>,JpaSpecificationExecutor<MenuTree>{

	/**
	 * 获取root菜单信息
	 * 
	 * @return MenuTree
	 */
	@Query("select new MenuTree(mt.menuId,mt.parentId,mt.menuText,mt.iconText,mt.nodeType,mt.urlText,mt.orderFlag) "
			+ "from MenuTree mt where mt.parentId is null")
	public MenuTree getMenuRoot();
	
	/**
	 * 依据父级菜单编号查询获取菜单信息集
	 * @param parentId 父级菜单编号
	 * @return List
	 */
	@Query("select distinct new MenuTree(mt.menuId,mt.parentId,mt.menuText,mt.iconText,mt.nodeType,mt.urlText,mt.orderFlag) "
			+ "from MenuTree mt where mt.parentId=?1")
	public List<MenuTree> findByParentId(Long parentId);
	
	/**
	 * 依据父级菜单编号查询获取菜单信息集
	 * @param parentId 父级菜单编号
	 * @return List
	 */
	@Query("select distinct new MenuTree(mt.menuId,mt.parentId,mt.menuText,mt.iconText,mt.nodeType,mt.urlText,mt.orderFlag) "
			+ "from MenuTree mt where mt.parentId=?1 and mt.menuText=?2")
	public List<MenuTree> findByParentIdAndMenutext(Long parentId,String menuText);

}
