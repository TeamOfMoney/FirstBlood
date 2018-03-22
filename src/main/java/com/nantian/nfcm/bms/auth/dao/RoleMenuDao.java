package com.nantian.nfcm.bms.auth.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.nantian.nfcm.bms.auth.entity.MenuTree;
import com.nantian.nfcm.bms.auth.entity.RoleAuth;
import com.nantian.nfcm.bms.auth.entity.RoleMenu;

public interface RoleMenuDao extends JpaRepository<RoleMenu, Long>, JpaSpecificationExecutor<RoleMenu> {
	@Query("select distinct new MenuTree(m.menuId,m.parentId,m.menuText,m.iconText,m.nodeType,m.urlText,m.orderFlag) "
			+ " from RoleMenu rm,MenuTree m where m.menuId=rm.menuId and rm.roleId in (?1)")
	public List<MenuTree> findMenuTreeByRoleIds(List<Long> roleId);
	
	/**
     * 根据角色id删除角色菜单信息列表
     *
     * @param roleId
     */
    public void deleteByRoleId(Long roleId);
    
    /**
     * 根据角色id查询角色菜单信息列表
     *
     * @param roleId
     * @return List<RoleAuth>
     */
	@Query("from RoleMenu rm where rm.roleId = ?1")
	public List<RoleMenu> findByRoleId(Long roleId);
	
	
   /* @Query("select rm.menuId from RoleMenu rm where rm.roleId = ?1")
    public List<Long> findMenuIdsByRoleId(Long roleId);*/
}
