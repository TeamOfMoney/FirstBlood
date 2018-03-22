package com.nantian.nfcm.bms.auth.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.nantian.nfcm.bms.auth.entity.AuthInfo;
import com.nantian.nfcm.bms.auth.entity.RoleAuth;

public interface RoleAuthDao extends JpaRepository<RoleAuth, Long>, JpaSpecificationExecutor<RoleAuth> {
	
	/**
     * 根据角色id列表查询权限信息列表
     *
     * @param roleIds
     * @return List<AuthInfo>
     */
	@Query("select distinct new AuthInfo(ai.authId,ai.authClass,ai.authCn,ai.serverPath) "
			+ "from RoleAuth ra,AuthInfo ai where ra.authId=ai.authId and ra.roleId in (?1)")
	public List<AuthInfo> findAuthInfoByRoleIds(List<Long> roleIds);
	
	/**
     * 根据角色id查询权限信息列表
     *
     * @param roleId
     * @return List<AuthInfo>
     */
	@Query("select distinct new AuthInfo(ai.authId,ai.authClass,ai.authCn,ai.serverPath) "
			+ "from RoleAuth ra,AuthInfo ai where ra.authId=ai.authId and ra.roleId = ?1")
	public List<AuthInfo> findAuthInfoByRoleId(Long roleId);
	
	/**
     * 根据角色id查询角色权限信息列表
     *
     * @param roleId
     * @return List<RoleAuth>
     */
	@Query("from RoleAuth ra where ra.roleId = ?1")
	public List<RoleAuth> findByRoleId(Long roleId);
	
	/**
     * 根据角色id查询权限ID列表
     *
     * @param roleId
     * @return List<Long>
     */
    @Query("select ra.authId from RoleAuth ra where ra.roleId = ?1")
    public List<Long> findAuthIdsByRoleId(Long roleId);
	
	/**
     * 根据角色id删除角色权限信息列表
     *
     * @param roleId
     */
    public void deleteByRoleId(Long roleId);
}
