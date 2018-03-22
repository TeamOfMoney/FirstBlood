package com.nantian.nfcm.util.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nantian.nfcm.bms.auth.dao.OrgDao;
import com.nantian.nfcm.bms.auth.dao.RoleAuthDao;
import com.nantian.nfcm.bms.auth.dao.RoleMenuDao;
import com.nantian.nfcm.bms.auth.dao.UserInfoDao;
import com.nantian.nfcm.bms.auth.dao.UserRoleDao;
import com.nantian.nfcm.bms.auth.entity.AuthInfo;
import com.nantian.nfcm.bms.auth.entity.MenuTree;
import com.nantian.nfcm.bms.auth.entity.OrgInfo;
import com.nantian.nfcm.bms.auth.entity.UserInfo;
import com.nantian.nfcm.util.BaseUtil;
import com.nantian.nfcm.util.DateUtil;
import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.service.LoginService;
import com.nantian.nfcm.util.vo.LoginBean;
@Service
public class LoginServiceImpl implements LoginService {
	private RoleAuthDao roleAuthDao;
	private RoleMenuDao roleMenuDao;
	private UserInfoDao userInfoDao;
	private UserRoleDao userRoleDao;
	private OrgDao orgDao;

	@Autowired
	public LoginServiceImpl( RoleAuthDao roleAuthDao,RoleMenuDao roleMenuDao, 
			UserInfoDao userInfoDao, UserRoleDao userRoleDao,OrgDao orgDao) {
		this.roleAuthDao = roleAuthDao;
		this.roleMenuDao = roleMenuDao;
		this.userInfoDao = userInfoDao;
		this.userRoleDao = userRoleDao;
		this.orgDao = orgDao;
	}

	/**
	 * 用户登录：1、判断用户是否存在；2、密码是否匹配；3、用户权限载入
	 * 
	 * @param loginBean
	 *            用户登录名,密码,远程机IP地址
	 * @throws ServiceException
	 */
	public void saveLogin(LoginBean loginBean) throws ServiceException {
		if (loginBean != null) {
			String userName = loginBean.getUserName();
			String orgName="";
			if (userName != null && !userName.equals("")) {
				UserInfo userInfo = userInfoDao.findOne(userName);
				if (userInfo != null) {
					String pwd = userInfo.getPwd();
					if (pwd != null && pwd.equals(BaseUtil.getMD5Encode(userName + loginBean.getPwd()))) {
						String realName=userInfo.getRealName();
						loginBean.setRealName(realName);
						String loginTime=DateUtil.getCurrentTime("yyyy-MM-dd HH:mm:ss");
						loginBean.setLoginTime(loginTime);
						Long orgId = userInfo.getOrgId();
						if(orgId!=null)
						{
							OrgInfo orgInfo=orgDao.findOne(orgId);
							if(orgInfo!=null)
							{
								orgName=orgInfo.getOrgName();
								loginBean.setOrgId(orgInfo.getOrgId());
								loginBean.setOrgCode(orgInfo.getOrgCode());
								loginBean.setOrgName(orgName);
								loginBean.setOrgPath(orgInfo.getOrgPath());
							}
						}
						
						setUserInfo(loginBean,userName);
					}
					else
					{
						throw new ServiceException("密码错误");
					}
				} else {
					throw new ServiceException("用户不存在");
				}
			} else {
				throw new ServiceException("用户名错误");
			}
		}
	}

	/**
	 * 登出
	 * 
	 * @param loginBean
	 * @throws ServiceException
	 */
	public void removeLogin(LoginBean loginBean) throws ServiceException {
		//TODO 登出操作
	}
	
	/**
	 * 查询用户关联权限信息
	 */
	private void setUserInfo(LoginBean loginBean,String userName)
	{
		List<Long> roleIds = userRoleDao.findRoleIdsByUserName(userName);
		Map<Long,String> userAuthIds=new HashMap<>();
		List<AuthInfo> auths = roleAuthDao.findAuthInfoByRoleIds(roleIds);
		if(auths!=null&&auths.size()>0) {
			for (AuthInfo authInfo:auths)
			{
				userAuthIds.put(authInfo.getAuthId(),authInfo.getServerPath());
			}
			loginBean.setUserAuthIds(userAuthIds);
		}
		List<MenuTree> menuTrees = roleMenuDao.findMenuTreeByRoleIds(roleIds);
		List<Long> menuTreesId = new ArrayList<>();
		if(menuTrees!=null&&menuTrees.size()>0) {
			for(MenuTree menuTree: menuTrees)
				menuTreesId.add(menuTree.getMenuId());
		}
		loginBean.setMenuTrees(menuTreesId);
		loginBean.setRoleIds(roleIds);
	}

}
