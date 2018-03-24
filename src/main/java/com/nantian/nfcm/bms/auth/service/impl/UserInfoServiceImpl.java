package com.nantian.nfcm.bms.auth.service.impl;

import com.nantian.nfcm.bms.auth.dao.OrgDao;
import com.nantian.nfcm.bms.auth.dao.RoleInfoDao;
import com.nantian.nfcm.bms.auth.dao.UserInfoDao;
import com.nantian.nfcm.bms.auth.dao.UserRoleDao;
import com.nantian.nfcm.bms.auth.entity.OrgInfo;
import com.nantian.nfcm.bms.auth.entity.RoleInfo;
import com.nantian.nfcm.bms.auth.entity.UserInfo;
import com.nantian.nfcm.bms.auth.entity.UserRole;
import com.nantian.nfcm.bms.auth.service.UserInfoService;
import com.nantian.nfcm.bms.auth.vo.UserBean;
import com.nantian.nfcm.util.BaseConst;
import com.nantian.nfcm.util.BaseUtil;
import com.nantian.nfcm.util.DateUtil;
import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.vo.GridData;
import com.nantian.nfcm.util.vo.LoginBean;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserInfoServiceImpl implements UserInfoService {
    private UserInfoDao userInfoDao;
    private UserRoleDao userRoleDao;
    private RoleInfoDao roleInfoDao;
    private OrgDao orgDao;

    @Autowired
    public UserInfoServiceImpl(UserInfoDao userInfoDao, UserRoleDao userRoleDao, RoleInfoDao roleInfoDao,OrgDao orgDao) {
        this.userInfoDao = userInfoDao;
        this.userRoleDao = userRoleDao;
        this.roleInfoDao = roleInfoDao;
        this.orgDao = orgDao;
    }

    public UserBean findByUserName(String userName, LoginBean loginBean) throws ServiceException {
        UserBean userBean;
        List<Long> toIds = new ArrayList<>();
        List<String> item;
        if (userName != null && userName.trim().length() > 0) {
            UserInfo userInfo = userInfoDao.findOne(userName);
            if (userInfo == null) {
                throw new ServiceException("用户已被其他用户删除");
            } else {
            	String orgPath = userInfo.getOrgPath();
				//judgePermitEdit(loginBean,userName,orgPath);
                Long roleId;
                userBean = po2vo(userInfo);
                List<RoleInfo> roleInfos = userRoleDao.findRoleInfoByUserName(userName);

                for (RoleInfo roleInfoTemp : roleInfos) {
                    roleId = roleInfoTemp.getRoleId();
                    toIds.add(roleId);
                    item = new ArrayList<>();
                    item.add(roleId.toString());
                    item.add(roleInfoTemp.getRoleName());
                    userBean.getOwnerRoles().add(item);
                }
            }
        } else {
            userBean = new UserBean();
            userBean.setOrgId(loginBean.getOrgId());
			userBean.setOrgCode(loginBean.getOrgCode());
			userBean.setOrgName(loginBean.getOrgName());
        }
        fillNotOwnerRoles(toIds, userBean.getNotOwnerRoles(), loginBean);
        return userBean;
    }
    
    private void judgePermitEdit(LoginBean loginBean,String userName,String orgPath) throws ServiceException
	{
		String editerOrgPath=loginBean.getOrgPath();
		if(!(loginBean.suAuthentication() || (editerOrgPath!=null && orgPath!=null && orgPath.startsWith(editerOrgPath))))
		{
			//throw new ServiceException("user.unpermit", new String[] { userName });
			throw new ServiceException("无权编辑用户["+userName+"]信息");
		}
	}

    @Transactional
    public UserBean addUserInfo(UserBean userBean,LoginBean loginBean) throws ServiceException {
        String userName = userBean.getUserName();
        UserInfo userInfo = userInfoDao.findOne(userName);
        if (userInfo != null) {
            throw new ServiceException("用户已存在[添加失败]");
        } else {
        	Long orgId=userBean.getOrgId();
			String orgPath = orgDao.findOne(orgId).getOrgPath();
			//judgePermitEdit(loginBean,userName,orgPath);
            userInfo = vo2po(userBean);
            String pwd = userBean.getPwd();
            if (pwd != null && pwd.length() > 0) {
                userInfo.setPwd(BaseUtil.getMD5Encode(userName + pwd));
            }
            userInfo.setRegisterTime(DateUtil.getCurrentTime("yyyy-MM-dd HH:mm:ss"));
            List<Long> ownerRoles = userBean.getRoleIds();
            userInfoDao.save(userInfo);
            if (ownerRoles != null && ownerRoles.size() > 0) {
                for (Long roleId : ownerRoles) {
                    UserRole userRole = new UserRole(roleId, userName);
                    userRoleDao.save(userRole);
                }
            }
        }
        return userBean;
    }

    @Transactional
    public UserBean updateUserInfo(UserBean userBean,LoginBean loginBean) throws ServiceException {
        String userName = userBean.getUserName();
        UserInfo userInfo = userInfoDao.findOne(userName);
        if (userInfo == null) {
            throw new ServiceException("用户不存在[修改失败]");
        } 
        else if("admin".equals(userName)||"developer".equals(userName))
        {
        	 throw new ServiceException("管理用户不能修改[修改失败]");
        }else {
        	String orgPath=userInfo.getOrgPath();
			judgePermitEdit(loginBean,userName,orgPath);
            //vo2po会覆盖pwd，需要先为userBean赋值
            userBean.setPwd(userInfo.getPwd());
            userBean.setRegisterTime(userInfo.getRegisterTime());
            userInfo = vo2po(userBean);
            userInfoDao.save(userInfo);
            List<Long> ownerRoles = userBean.getRoleIds();
            List<UserRole> userRoles = userRoleDao.findByUserName(userName);
            if (ownerRoles != null && ownerRoles.size() > 0) {
                for (UserRole userRole : userRoles) {
                    Long roleId = userRole.getRoleId();
                    if (!ownerRoles.contains(roleId)) {
                        userRoleDao.delete(userRole);
                    }
                }
                for (UserRole userRole : userRoles) {
                    Long roleId = userRole.getRoleId();
                    ownerRoles.remove(roleId);
                }
                for (Long roleId : ownerRoles) {
                    UserRole userRole = new UserRole(roleId, userName);
                    userRoleDao.save(userRole);
                }
            } else {
                userRoleDao.delete(userRoles);
            }
            return userBean;
        }
    }

    @Transactional
    public void delUserInfo(UserBean userBean,LoginBean loginBean) throws ServiceException {
        String userName = userBean.getUserName();
        UserInfo userInfo = userInfoDao.findOne(userName);
        if (userInfo == null) {
            throw new ServiceException("用户不存在[删除失败]");
        } 
        else if("admin".equals(userName)||"developer".equals(userName))
        {
       	 throw new ServiceException("管理用户不能删除[删除失败]");
       }
        else {
        	String orgPath = userInfo.getOrgPath();
			judgePermitEdit(loginBean,userName,orgPath);
            userInfoDao.delete(userName);
            userRoleDao.deleteByUserName(userName);
        }
    }

    @Override
    public GridData<UserBean> findByCondition(int page, int size, UserBean userBean,LoginBean loginBean) throws ServiceException {
        Pageable pageable = new PageRequest(page, size, Sort.Direction.ASC, "registerTime");

        Specification<UserInfo> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (userBean.getUserName() != null && !userBean.getUserName().equals("")) {
                Predicate userName = criteriaBuilder.like(root.get("userName").as(String.class), userBean.getUserName() + "%");
                predicates.add(userName);
            }
            if (userBean.getState() != null && !userBean.getState().equals("")) {
                Predicate state = criteriaBuilder.equal(root.get("state").as(String.class), userBean.getState());
                predicates.add(state);
            }
            if (userBean.getRealName() != null && !userBean.getRealName().equals("")) {
                Predicate realName = criteriaBuilder.like(root.get("realName").as(String.class), "%" + userBean.getRealName() + "%");
                predicates.add(realName);
            }
            if (userBean.getQueryStartTime() != null && userBean.getQueryEndTime() != null) {
                Predicate registerTime = criteriaBuilder.between(root.get("registerTime").as(String.class), userBean.getQueryStartTime(), userBean.getQueryEndTime());
                predicates.add(registerTime);
            }
            if (userBean.getOrgPath() != null && !userBean.getOrgPath().equals("")) {
                Predicate orgPath = criteriaBuilder.like(root.get("orgPath").as(String.class), userBean.getOrgPath()+"%");
                predicates.add(orgPath);
            }
            /*if ((userBean.getOrgId())) {
                Predicate orgPath = criteriaBuilder.like(root.get("orgPath").as(String.class), userBean.getOrgPath()+"%");
                predicates.add(orgPath);
            }*/
            if (userBean.getOrgCode() != null && !userBean.getOrgCode().equals("")) {
                Predicate orgCode = criteriaBuilder.like(root.get("orgCode").as(String.class), userBean.getOrgCode()+"%");
                predicates.add(orgCode);
            }
            if (userBean.getUserType() != null && !userBean.getUserType().equals("")) {
                Predicate userType = criteriaBuilder.equal(root.get("userType").as(String.class), userBean.getOrgCode());
                predicates.add(userType);
            }
            query.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
            return query.getRestriction();
        };
        //return userInfoDao.findAll(specification, pageable);
        Page<UserInfo> userInfoPage = userInfoDao.findAll(specification, pageable);
        List<UserInfo> userInfos = userInfoPage.getContent();
        List<UserBean> userBeans = new ArrayList<>();
        UserBean userBeanTemp = null;
        for (UserInfo userInfo : userInfos) {
        	userBeanTemp = po2vo(userInfo);
        	userBeans.add(userBeanTemp);
			/*orgTreeNode.setParentOrgName(orgDao.findOne(orgInfo.getParentId())
					.getOrgName());
			orgTreeNodes.add(orgTreeNode);*/
        }
        GridData<UserBean> gridData = new GridData<>();
        gridData.setData(userBeans);
        gridData.setNumber(userInfoPage.getTotalElements());
        gridData.setPage(userInfoPage.getNumber());
        gridData.setTotalPage(userInfoPage.getTotalPages());
        return gridData;
    }

    private UserBean po2vo(UserInfo userInfo) {
        UserBean userBean = new UserBean();
        BeanUtils.copyProperties(userInfo, userBean);
        Long orgId = userInfo.getOrgId();
        if(orgId!=null)
        {
        	OrgInfo orgInfo = orgDao.findOne(orgId);
        	if(orgInfo!=null)
        	{
        		userBean.setOrgCode(orgInfo.getOrgCode());
                userBean.setOrgName(orgInfo.getOrgName());
                userBean.setOrgId(orgInfo.getOrgId());
                userBean.setOrgPath(orgInfo.getOrgPath());
        	}
        	
        }
        return userBean;
    }

    private UserInfo vo2po(UserBean userBean) {
        UserInfo userInfo = new UserInfo();
        BeanUtils.copyProperties(userBean, userInfo);
        Long orgId=userBean.getOrgId();
		if(orgId!=null)
		{
			OrgInfo orgInfo=orgDao.findOne(orgId);
			if(orgInfo!=null)
			{
				userInfo.setOrgId(orgInfo.getOrgId());
				userInfo.setOrgPath(orgInfo.getOrgPath());
			}
		}
        return userInfo;
    }

    public synchronized void fillNotOwnerRoles(List<Long> ownerRoleIds, List<Object> notOwnerRoles, LoginBean loginBean) {
        List<String> item;
        Long roleId;
        String roleCreator;
        String editorUserName = loginBean.getUserName();
        List<RoleInfo> roleInfos = roleInfoDao.findAll();
        for (RoleInfo roleInfo : roleInfos) {
            roleId = roleInfo.getRoleId();
            roleCreator = roleInfo.getRoleCreator();
            if (roleId >= BaseConst.CORE_AUTHORITY_LIMIT && (!ownerRoleIds.contains(roleId))
                    && (loginBean.rootAuthentication()
                    //||loginBean.getUserRoleIds().contains(roleId)
                    || editorUserName.equals(roleCreator))) {
                //roleInfo = (RoleInfo) rolesAuthority.get(roleId);
                item = new ArrayList<String>();
                item.add(roleId.toString());
                item.add(roleInfo.getRoleName());
                notOwnerRoles.add(item);
            }
        }
    }

    public UserBean resetUserPwd(UserBean userBean,LoginBean loginBean) throws ServiceException {
        String userName = userBean.getUserName();
        UserInfo userInfo = (UserInfo) userInfoDao.findOne(userName);
        if (userInfo == null) {
            throw new ServiceException("用户已被其他用户删除");
        } 
        else if("admin".equals(userName)||"developer".equals(userName))
        {
        	 throw new ServiceException("管理用户不能重置密码[重置密码失败]");
        }
        else{
        	String orgPath = userInfo.getOrgPath();
			judgePermitEdit(loginBean,userName,orgPath);
            String pwd = BaseUtil.getMD5Encode(userName + "e10adc3949ba59abbe56e057f20f883e");
            userInfo.setPwd(pwd);
            userInfoDao.save(userInfo);
            return po2vo(userInfo);
        }
    }

    @Override
    public boolean queryIsInitPw(LoginBean loginBean) throws ServiceException {
        String userName = loginBean.getUserName();
        UserInfo userInfo = (UserInfo) userInfoDao.findOne(userName);
        if (userInfo != null) {
            String dbPw = userInfo.getPwd();
            if (dbPw.equals(BaseUtil.getMD5Encode(userName + "e10adc3949ba59abbe56e057f20f883e"))) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    /**
	 * 个人信息修改
	 * @param userBean UserBean 用户信息
	 * @param userName String 登录用户名
	 * @return UserBean
	 */
	public UserBean updateUserSelf(UserBean userBean, String userName)
			throws ServiceException
	{
		String userNameSelf = userBean.getUserName();
		if (userName.equals(userNameSelf))
		{
			UserInfo userInfo = (UserInfo) userInfoDao.findOne(userName);
			if (userInfo == null)
			{
				throw new ServiceException("用户已被其他用户删除");
			}
			else
			{
				if (userInfo.getPwd()!=null && userInfo.getPwd().equals(BaseUtil.getMD5Encode(userName+userBean.getOldPwd())))
				{
					//userInfo.setTelephone(userBean.getTelephone());
					//userInfo.setMobilePhone(userBean.getMobilePhone());
					//userInfo.setEmail(userBean.getEmail());
					//userInfo.setFax(userBean.getFax());
					String pwd = userBean.getPwd();
					if (pwd != null && pwd.length() > 0 && !pwd.equalsIgnoreCase("d41d8cd98f00b204e9800998ecf8427e"))
					{
						userInfo.setPwd(BaseUtil.getMD5Encode(userName+pwd));
					}
					userInfoDao.save(userInfo);
					return po2vo(userInfo);
				}
				else
				{
					throw new ServiceException("旧密码错误!");
				}
			}
		}
		else
		{
			throw new ServiceException("user.unSelfUpdate", new String[] { userName });
		}
	}
    
	
	public List queryReviewUserOptions() throws ServiceException {
		List<UserInfo> reviewUserList = userInfoDao.findByUserType("3");
		return reviewUserList;
	}

}
