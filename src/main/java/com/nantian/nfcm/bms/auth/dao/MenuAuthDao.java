package com.nantian.nfcm.bms.auth.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.nantian.nfcm.bms.auth.entity.AuthInfo;
import com.nantian.nfcm.bms.auth.entity.MenuAuth;
import com.nantian.nfcm.bms.auth.entity.MenuTree;

public interface MenuAuthDao extends JpaRepository<MenuAuth, Long>, JpaSpecificationExecutor<MenuAuth> {
/*	@Query("select new AuthInfo(authId,authClass,anthCn,serverPath) from AuthInfo ai "
			+ "left join RoleAuth ra on ra.authId = ai.authId where ai.authId in (?1)")*/
	@Query("select distinct new AuthInfo(ai.authId,ai.authClass,ai.authCn,ai.serverPath) "
			+ "from MenuAuth ma,AuthInfo ai where ma.authId=ai.authId and ma.menuId in (?1)")
	public List<AuthInfo> findAuthInfoByMenuIds(List<Long> menuIds);
	
	@Query("select distinct new AuthInfo(ai.authId,ai.authClass,ai.authCn,ai.serverPath) "
			+ "from MenuAuth ma,AuthInfo ai where ma.authId=ai.authId and ma.menuId = ?1")
	public List<AuthInfo> findAuthInfoByMenuId(Long menuIds);
	
	@Query("select distinct new MenuAuth(ma.id,ma.menuId,ma.authId) "
			+ "from MenuAuth ma where ma.authId=?1 and ma.menuId = ?2")
	public List<MenuAuth> findMenuAuthByAuthIdAndMenuId(Long authId,Long menuId);

	@Query("select distinct new MenuAuth(ma.id,ma.menuId,ma.authId) "
			+ "from MenuAuth ma where ma.menuId = ?1")
	public List<MenuAuth> findMenuAuthByMenuId(Long menuId);
	
	 /**
     * 根据权限id查询菜单权限信息列表
     *
     * @param authId
     * @return
     */
    public List<MenuAuth> findByAuthId(Long authId);
    
    @Query("select distinct new MenuTree(mt.menuId,mt.parentId,mt.menuText,mt.iconText,mt.nodeType,mt.urlText,mt.orderFlag)"
			+ "from MenuAuth ma,MenuTree mt where ma.menuId=mt.menuId and ma.authId in (?1)")
	public List<MenuTree> findMenuInfoByAuthIds(List<Long> authIds);


}
