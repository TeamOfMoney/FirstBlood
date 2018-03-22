package com.nantian.nfcm.bms.auth.dao;

import com.nantian.nfcm.bms.auth.entity.RoleInfo;
import com.nantian.nfcm.bms.auth.entity.UserInfo;
import com.nantian.nfcm.bms.auth.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRoleDao extends JpaRepository<UserRole, Long>, JpaSpecificationExecutor<UserRole> {
    /**
     * 根据用户名查询角色ID列表
     *
     * @param userName
     * @return List<Long>
     */
    @Query("select ur.roleId from UserRole ur where ur.userName = ?1")
    public List<Long> findRoleIdsByUserName(String userName);

    /**
     * 根据用户名查询用户角色信息列表
     *
     * @param userName
     * @return
     */
    public List<UserRole> findByUserName(String userName);

    /**
     * 根据用户名删除用户角色信息列表
     *
     * @param userName
     */
    public void deleteByUserName(String userName);
    
    /**
     * 根据角色ID查询用户信息列表
     *
     * @param roleId
     * @return List<Long>
     */
    //,ui.pwd,ui.mobilePhone,ui.email,ui.sex,ui.state,ui.registerTime
    @Query("select distinct new UserInfo(ui.userName,ui.realName) from UserInfo ui,UserRole ur, RoleInfo ri "
    		+ "where ui.userName=ur.userName and ur.roleId = ri.roleId and ri.roleId = ?1")
	public List<UserInfo> findUserInfoByRoleId(Long roleId);
    
    /**
     * 根据用户名查询角色信息列表
     *
     * @param userName
     * @return List<RoleInfo>
     */
    //,ui.pwd,ui.mobilePhone,ui.email,ui.sex,ui.state,ui.registerTime
    @Query("select distinct new RoleInfo(ri.roleId,ri.roleName,ri.roleDesc,ri.roleCreator) from UserRole ur, RoleInfo ri "
    		+ "where ur.roleId = ri.roleId and ur.userName = ?1")
	public List<RoleInfo> findRoleInfoByUserName(String userName);
}
