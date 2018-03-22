package com.nantian.nfcm.bms.auth.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.nantian.nfcm.bms.auth.entity.MenuTree;
import com.nantian.nfcm.bms.auth.entity.OrgInfo;
import com.nantian.nfcm.bms.auth.entity.RoleInfo;
import com.nantian.nfcm.bms.auth.entity.UserInfo;

public interface OrgDao extends JpaRepository<OrgInfo, Long>,JpaSpecificationExecutor<OrgInfo>{
	/**
     * 根据角色id查询权限ID列表
     *
     * @param roleId
     * @return List<Long>
     */
   // @Query("select ra.authId from RoleAuth ra where ra.roleId = ?1")
   // @Query("select count(oi.orgId) from OrgInfo oi where lower(oi.orgName)= ?1")
    //public int isExistOrgName(String orgName);
    
	@Query("from OrgInfo oi where oi.orgName=?1")
	public List<OrgInfo> findByOrgName(String orgName);
	
	@Query("from OrgInfo oi where oi.orgCode=?1")
	public List<OrgInfo> findByOrgCode(String orgCode);
	
	/**
	 * 依据父级机构编号查询获取机构信息集
	 * @param parentId 父级机构编号
	 * @return List
	 */
	@Query("from OrgInfo oi where oi.parentId=?1")
	public List<OrgInfo> findByParentId(Long parentId);
	
	/**
	 * 获取root机构信息
	 * 
	 * @return OrgInfo
	 */
	@Query("from OrgInfo oi where oi.parentId is null")
	public OrgInfo getOrgRoot();
	
	/**
	 * 获取机构下的信息
	 * 
	 * @return List<UserInfo>
	 */
	@Query("from UserInfo ui where ui.orgId=?1")
	public List<UserInfo> findUserByOrgId(Long orgId);

}
