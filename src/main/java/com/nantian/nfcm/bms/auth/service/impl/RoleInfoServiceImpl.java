package com.nantian.nfcm.bms.auth.service.impl;


import com.nantian.nfcm.bms.auth.dao.AuthInfoDao;
import com.nantian.nfcm.bms.auth.dao.MenuAuthDao;
import com.nantian.nfcm.bms.auth.dao.MenuTreeDao;
import com.nantian.nfcm.bms.auth.dao.RoleAuthDao;
import com.nantian.nfcm.bms.auth.dao.RoleInfoDao;
import com.nantian.nfcm.bms.auth.dao.RoleMenuDao;
import com.nantian.nfcm.bms.auth.dao.UserRoleDao;
import com.nantian.nfcm.bms.auth.entity.AuthInfo;
import com.nantian.nfcm.bms.auth.entity.MenuAuth;
import com.nantian.nfcm.bms.auth.entity.MenuTree;
import com.nantian.nfcm.bms.auth.entity.RoleAuth;
import com.nantian.nfcm.bms.auth.entity.RoleInfo;
import com.nantian.nfcm.bms.auth.entity.RoleMenu;
import com.nantian.nfcm.bms.auth.entity.UserInfo;
import com.nantian.nfcm.bms.auth.service.RoleInfoService;
import com.nantian.nfcm.bms.auth.vo.MenuTreeNode;
import com.nantian.nfcm.bms.auth.vo.RoleBean;
import com.nantian.nfcm.util.BaseConst;
import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.vo.CheckTreeNode;
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
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class RoleInfoServiceImpl implements RoleInfoService {
    private RoleInfoDao roleInfoDao;
    private RoleAuthDao roleAuthDao;
    private MenuTreeDao menuTreeDao;
    private MenuAuthDao menuAuthDao;
    private AuthInfoDao authInfoDao;
    private UserRoleDao userRoleDao;
    private RoleMenuDao roleMenuDao;

    @Autowired
    public RoleInfoServiceImpl(RoleInfoDao roleInfoDao, RoleAuthDao roleAuthDao,MenuTreeDao menuTreeDao,MenuAuthDao menuAuthDao,AuthInfoDao authInfoDao,UserRoleDao userRoleDao,RoleMenuDao roleMenuDao) {
        this.roleInfoDao = roleInfoDao;
        this.roleAuthDao = roleAuthDao;
        this.menuTreeDao = menuTreeDao;
        this.menuAuthDao = menuAuthDao;
        this.authInfoDao = authInfoDao;
        this.userRoleDao = userRoleDao;
        this.roleMenuDao = roleMenuDao;
    }

    public RoleBean findById(Long roleId) throws ServiceException {
    	RoleInfo roleInfo = roleInfoDao.findOne(roleId);
        return po2vo(roleInfo);
    }
    
    private String getRoleName(RoleBean roleBean) throws ServiceException
	{
		String roleName = roleBean.getRoleName();
		if (roleName != null && roleName.trim().length() > 0)
		{
			return roleName;
		}
		else
		{
			throw new ServiceException("role.roleNameRequire");
		}
	}

    @Transactional
    public RoleBean addRoleInfo(RoleBean roleBean,LoginBean loginBean) throws ServiceException {
        	String roleName = getRoleName(roleBean);
    		List<RoleInfo> roleList = roleInfoDao.findByRoleName(roleName);
    		if (roleList != null && roleList.size() > 0)
    		{
    			throw new ServiceException("角色已存在[添加失败]");
    		}
    		else
    		{
    			RoleInfo roleInfo = new RoleInfo();
    			roleInfo=vo2po(roleBean);
    			roleInfo.setRoleCreator(loginBean.getUserName());
    			RoleInfo roleInfoTmp = roleInfoDao.saveAndFlush(roleInfo);
    			
    			Long roleId = roleInfoTmp.getRoleId();
    			List<Long> authIds = roleBean.getAuthIds();
    			for(Long authId:authIds)
    			{
    				//插入角色权限信息
    				RoleAuth roleAuth = new RoleAuth();
    				roleAuth.setAuthId(authId);
    				roleAuth.setRoleId(roleId);
    				roleAuthDao.saveAndFlush(roleAuth);
    				

    			}
    			//插入角色菜单信息
    			List<MenuTree> menuTrees = menuAuthDao.findMenuInfoByAuthIds(authIds);
				MenuTree rootMenu = menuTreeDao.getMenuRoot();
				List<Long> addMenuIds = new ArrayList<>();
				for(MenuTree menuTree:menuTrees)
				{
					MenuTree parentMenuTree = menuTreeDao.findOne(menuTree.getParentId());
					findMenuTreeIds(parentMenuTree,addMenuIds,rootMenu);
					RoleMenu roleMenu = new RoleMenu();
					roleMenu.setMenuId(menuTree.getMenuId());
					roleMenu.setRoleId(roleId);
					roleMenuDao.save(roleMenu);
				}
				for(Long menuId:addMenuIds)
				{
					RoleMenu roleMenu = new RoleMenu();
					roleMenu.setMenuId(menuId);
					roleMenu.setRoleId(roleId);
					roleMenuDao.save(roleMenu);
				}
    			
    			
    			
    			return po2vo(roleInfo);
    		}
    }

    @Transactional
    public RoleBean updateRoleInfo(RoleBean roleBean) throws ServiceException {
    	 Long roleId = roleBean.getRoleId();
    	 String roleName = getRoleName(roleBean);
         RoleInfo roleInfo = roleInfoDao.findOne(roleId);
        if (roleInfo == null) {
            throw new ServiceException("角色不存在[修改失败]");
        } else {
			
        	if (roleInfo.getRoleId() >= BaseConst.NORMAL_AUTHORITY_LIMIT)
			{
				if (!roleName.equals(roleInfo.getRoleName()))
				{
					List<RoleInfo> roleList = roleInfoDao.findByRoleName(roleName);
					if (roleList != null && roleList.size() > 0)
					{
						throw new ServiceException("角色名已存在");
					}
				}
				
				roleInfo.setRoleName(roleBean.getRoleName());
				roleInfo.setRoleDesc(roleBean.getRoleDesc());
				
				//roleInfo = vo2po(roleBean);
				roleInfoDao.saveAndFlush(roleInfo);
				
				List<Long> authIds = roleBean.getAuthIds();
				List<RoleAuth> ownRoleAuthInfos = roleAuthDao.findByRoleId(roleId);
				if (authIds != null && authIds.size() > 0) {
	                for (RoleAuth ownRoleAuthAuthInfo : ownRoleAuthInfos) {
	                    Long ownAuthId = ownRoleAuthAuthInfo.getAuthId();
	                    if (!authIds.contains(ownAuthId)) {
	                    	roleAuthDao.delete(ownRoleAuthAuthInfo);
	                    }
	                }
	                for (RoleAuth ownRoleAuthAuthInfo : ownRoleAuthInfos)  {
	                    Long authId = ownRoleAuthAuthInfo.getAuthId();
	                    authIds.remove(authId);
	                }
	                for (Long authId : authIds) {
	                    RoleAuth roleAuth = new RoleAuth();
	                    roleAuth.setAuthId(authId);
	                    roleAuth.setRoleId(roleId);
	                    roleAuthDao.save(roleAuth);
	                }
	            } else {
	            	roleAuthDao.delete(ownRoleAuthInfos);
	            }
				
				List<Long> newAuthIds = roleAuthDao.findAuthIdsByRoleId(roleId);
				
				roleMenuDao.deleteByRoleId(roleId);
				//判断角色具备的权限是否为空,不为空则插入角色菜单信息
				if(newAuthIds.size()>0)
				{
					//插入角色菜单信息
					List<MenuTree> menuTrees = menuAuthDao.findMenuInfoByAuthIds(newAuthIds);
					MenuTree rootMenu = menuTreeDao.getMenuRoot();
					List<Long> addMenuIds = new ArrayList<>();
					for(MenuTree menuTree:menuTrees)
					{
						MenuTree parentMenuTree = menuTreeDao.findOne(menuTree.getParentId());
						findMenuTreeIds(parentMenuTree,addMenuIds,rootMenu);
						RoleMenu roleMenu = new RoleMenu();
						roleMenu.setMenuId(menuTree.getMenuId());
						roleMenu.setRoleId(roleId);
						roleMenuDao.save(roleMenu);
					}
					for(Long menuId:addMenuIds)
					{
						RoleMenu roleMenu = new RoleMenu();
						roleMenu.setMenuId(menuId);
						roleMenu.setRoleId(roleId);
						roleMenuDao.save(roleMenu);
					}
				}
				
				

			
				return po2vo(roleInfo);
			}
			else
			{
				throw new ServiceException("系统角色拒绝编辑");
			}
        }
    }
    
    public void findMenuTreeIds(MenuTree menuTree,List<Long> addMenuIds,MenuTree rootMenu)
    {
    	if(!menuTree.getParentId().equals(rootMenu.getMenuId()))
    	{
    		if(!addMenuIds.contains(menuTree.getMenuId()))
    		{
    			addMenuIds.add(menuTree.getMenuId());
    		}
    		MenuTree parentMenuTree = menuTreeDao.findOne(menuTree.getParentId());
    		findMenuTreeIds(parentMenuTree,addMenuIds,rootMenu);
    	}
    	else {
    		if(!addMenuIds.contains(menuTree.getMenuId()))
    		{
    			addMenuIds.add(menuTree.getMenuId());
    		}
    	}
    	
    }

    @Transactional
    public void delRoleInfo(RoleBean roleBean) throws ServiceException {
    	Long roleId = roleBean.getRoleId();
    	if (roleId != null)
		{
			RoleInfo roleInfo = (RoleInfo) roleInfoDao.findOne(roleId);
			if (roleInfo != null)
			{
				if (roleInfo.getRoleId() >= BaseConst.NORMAL_AUTHORITY_LIMIT)
				{
					roleMenuDao.deleteByRoleId(roleId);
				   	roleAuthDao.deleteByRoleId(roleId);
				   	roleInfoDao.delete(roleId);
				}
				else
				{
					throw new ServiceException("当前用户权限不够[删除失败]");
				}
			}else{
				throw new ServiceException("角色id为空[删除失败]");
			}
		}
       
       
    }

    @Override
    public Page<RoleInfo> findByCondition(int page, int size, RoleBean roleBean) throws ServiceException {
        Pageable pageable = new PageRequest(page, size, Sort.Direction.ASC, "roleId");

        Specification<RoleInfo> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (roleBean.getRoleName() != null && !roleBean.getRoleName().equals("")) {
                Predicate userName = criteriaBuilder.like(root.get("roleName").as(String.class), "%"+roleBean.getRoleName() + "%");
                predicates.add(userName);
            }
            if (roleBean.getRoleDesc() != null && !roleBean.getRoleDesc().equals("")) {
                Predicate roleDesc = criteriaBuilder.like(root.get("roleDesc").as(String.class), "%"+roleBean.getRoleDesc()+"%");
                predicates.add(roleDesc);
            }
            
            query.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
            return query.getRestriction();
        };
        return roleInfoDao.findAll(specification, pageable);
    }

    private RoleBean po2vo(RoleInfo roleInfo) {
    	RoleBean roleBean = new RoleBean();
        BeanUtils.copyProperties(roleInfo, roleBean);
        Long roleId = roleInfo.getRoleId();
        
         List<Long> authIds = new ArrayList<>();
        List<AuthInfo> authInfos = roleAuthDao.findAuthInfoByRoleId(roleId);
        for(AuthInfo authInfo : authInfos)
        {
        	authIds.add(authInfo.getAuthId());
        }
        roleBean.setAuthIds(authIds);
        
       /*List<Long> authorityIds = new ArrayList<Long>();
		List<RoleAuth> roleAuths = roleAuthDao.findByRoleId(roleId);
		if(roleAuths!=null&&roleAuths.size()>0) {
			for (RoleAuth roleAuthority : roleAuths)
			{
				authorityIds.add(roleAuthority.getAuthId());
			}
			roleBean.setAuthIds(authorityIds);
		}
		List<Long> menuIds = new ArrayList<Long>();
		List<RoleMenu> roleMenus = roleMenuDao.findByRoleId(roleId);
		if(roleMenus!=null&&roleMenus.size()>0) {
			for (RoleMenu roleMenu : roleMenus)
			{
				menuIds.add(roleMenu.getMenuId());
			}
			roleBean.setMenuIds(menuIds);
		}*/
        return roleBean;
    }

    private RoleInfo vo2po(RoleBean roleBean) {
    	RoleInfo roleInfo = new RoleInfo();
        BeanUtils.copyProperties(roleBean, roleInfo);
        
        /*Long roleId = roleBean.getRoleId();
		List<Long> authorityIds = roleBean.getAuthIds();
		if(authorityIds!=null && authorityIds.size()>0){
			roleAuthDao.deleteByRoleId(roleId);
			for(Long authorityId:authorityIds){
				if (authorityId != null){
					RoleAuth roleAuthority = new RoleAuth();
					roleAuthority.setRoleId(roleId);
					roleAuthority.setAuthId(authorityId);
					roleAuthDao.save(roleAuthority);
				}
			}
		}
		List<Long> menuIds = roleBean.getMenuIds();
		if(menuIds!=null && menuIds.size()>0) {
			roleMenuDao.deleteByRoleId(roleId);
			for(Long menuId:menuIds){
				if (menuId != null){
					RoleMenu roleMenu = new RoleMenu();
					roleMenu.setRoleId(roleId);
					roleMenu.setMenuId(menuId);
					roleMenuDao.save(roleMenu);
				}
			}
		}*/
        return roleInfo;
    }

	@Override
	public CheckTreeNode loadAuthorityCheckTree(LoginBean loginBean,Long roleId) throws ServiceException {
		Set<Long> roleAuthorityIds= new HashSet<Long>(0);
		CheckTreeNode checkTreeNode = new CheckTreeNode();
		String editorUserName=loginBean.getUserName();
		
		if (editorUserName != null && editorUserName.trim().length() > 0)
		{
			if (roleId != null)
			{
				RoleInfo roleInfo = roleInfoDao.findOne(roleId);
				if (roleInfo == null)
				{
					throw new ServiceException("角色不存在");
				}
				else
				{
//					judgePermitEdit(roleCoreInfo,loginBean);
					List<AuthInfo> roleAuthInfo =roleAuthDao.findAuthInfoByRoleId(roleId);
					//roleAuthorityIds = roleInfo.getAuthorityIds();
					for(AuthInfo authInfo :roleAuthInfo)
					{
						roleAuthorityIds.add(authInfo.getAuthId());
					}
					
				}
			}
		
			List<Long> creatorAuthorityIds;
			if (loginBean.rootAuthentication())
			{
				creatorAuthorityIds = roleInfoDao.findAllAuthIds();
			}
			else
			{
				creatorAuthorityIds = roleInfoDao.findAuthorityIdsByUserName(editorUserName);
			}
			//MenuTreeNode menuTreeNodeRoot = MenuPool.getInstance().queryMenuTreeRoot();
			//MenuTree menuTreeRoot = menuTreeDao.getMenuRoot();
			MenuTreeNode menuTreeNodeRoot=initMenuTree(null,true);

			checkTreeNode.setId(menuTreeNodeRoot.getId());
			checkTreeNode.setText(menuTreeNodeRoot.getText());
			checkTreeNode.setExpanded(true);
			Map<String, List<AuthInfo>> menuAuthorityMap = queryMenuAuthorityAll();
			getChildAuthorityTree(roleAuthorityIds, creatorAuthorityIds,
					checkTreeNode, menuTreeNodeRoot.getChildren(), menuAuthorityMap);
			if (checkTreeNode.childrenSize() == checkTreeNode.childrenCheckNum())
			{
				checkTreeNode.setChecked(true);
			}
			return checkTreeNode;
		}
		else
		{
			throw new ServiceException("该角色只有创建者或超级管理员允许编辑");
		}
	}
	
	
	/**
	 * getChildAuthorityTree 递归过滤生成指定节点的子树（附带check框）
	 * 注：传入的menuTreeList已经依据parentId和menuId升序排序，menuId由递增序列生成
	 * 
	 * @param roleAuthorityIds 角色权限信息集合
	 * @param creatorAuthorityIds 创建者权限集合
	 * @param checkTreeNode 指定节点
	 * @param menuTreeNodeChildren 菜单树子节点集
	 * @param menuAuthorityMap 菜单项权限集合
	 */
	private void getChildAuthorityTree(Set<Long> roleAuthorityIds,List<Long> creatorAuthorityIds,CheckTreeNode checkTreeNode, List<MenuTreeNode> menuTreeNodeChildren, Map<String, List<AuthInfo>> menuAuthorityMap)
	{
		if(menuTreeNodeChildren!=null && menuTreeNodeChildren.size()>0)
		{
			Long nodeType;
			CheckTreeNode childCheckTreeNode=null;
			for(MenuTreeNode childMenuTreeNode:menuTreeNodeChildren)
			{
				nodeType = childMenuTreeNode.getNodeType();
				childCheckTreeNode = new CheckTreeNode(childMenuTreeNode.getId(),childMenuTreeNode.getText());
				childCheckTreeNode.setNodeType(nodeType);
				childCheckTreeNode.setExpanded(true);
				if (nodeType.longValue() != BaseConst.MIDDLE_NODE)
				{
					childMenuTreeNode.syncMenuAuthority(menuAuthorityMap.get(childMenuTreeNode.getId()));
					attachAuthorityNode(roleAuthorityIds,creatorAuthorityIds,childCheckTreeNode,childMenuTreeNode.getAuthInfos());
					if (childCheckTreeNode.childrenSize() > 0)
					{
						checkTreeNode.addChildNode(childCheckTreeNode);
					}
				}
				else
				{
					getChildAuthorityTree(roleAuthorityIds,creatorAuthorityIds,childCheckTreeNode, childMenuTreeNode.getChildren(),menuAuthorityMap);
					if (childCheckTreeNode.childrenSize() > 0)
					{
						if (childCheckTreeNode.childrenSize() == childCheckTreeNode
								.childrenCheckNum())
						{
							childCheckTreeNode.setChecked(true);
						}
						checkTreeNode.addChildNode(childCheckTreeNode);
					}
				}
			}
		}
	}
	
	/**
	 * attachAuthorityNode 捆绑菜单叶子节点的子节点（附带check框）
	 *  
	 * @param roleAuthorityIds 角色权限信息集合
	 * @param creatorAuthorityIds 创建者权限集合
	 * @param childCheckTreeNode 菜单叶子节点
	 * @param itemAuthoritys 菜单叶子节点权限集合
	 */
	private void attachAuthorityNode(Set<Long> roleAuthorityIds, List<Long> creatorAuthorityIds,
			CheckTreeNode childCheckTreeNode, List<AuthInfo> itemAuthoritys)
	{
		if (itemAuthoritys != null && itemAuthoritys.size() > 0)
		{
			CheckTreeNode authorityNode;
			Long authorityId;
			int checkNum = 0;
			Object[] objArry = itemAuthoritys.toArray();
			for (AuthInfo authorityCoreInfo : itemAuthoritys)
			{
				authorityId = authorityCoreInfo.getAuthId();
				authorityNode = new CheckTreeNode(authorityId.toString(),
						authorityCoreInfo.getAuthCn());
				authorityNode.setLeaf(true);
				authorityNode.setNodeType(BaseConst.AUTHORITY_LEAF);
				if (roleAuthorityIds.contains(authorityId))
				{
					authorityNode.setChecked(true);
					checkNum++;
					childCheckTreeNode.addChildNode(authorityNode);
				}
				else if(creatorAuthorityIds.contains(authorityId))
				{
					childCheckTreeNode.addChildNode(authorityNode);
				}
			}
			if (checkNum > 0 && checkNum == objArry.length)
			{
				childCheckTreeNode.setChecked(true);
			}
		}
	}
	
	private MenuTreeNode initMenuTree(List<Long> menuIds, boolean queryAllFlag)
	{
		MenuTree rootMenu = menuTreeDao.getMenuRoot();
		MenuTreeNode menuTreeNode = new MenuTreeNode(rootMenu, queryAllFlag);
		
		//menuTreeNode.setAuthInfos(menuAuthDao.findAuthInfoByMenuId(rootMenu.getMenuId()));
		
		getMenuChildTree(menuTreeNode, menuTreeDao.findByParentId(rootMenu.getMenuId()),menuIds,queryAllFlag);
		return menuTreeNode;
		
	}
	
	private void getMenuChildTree(MenuTreeNode menuTreeNode, List<MenuTree> menuTrees, List<Long> menuIds, boolean queryAllFlag)
	{
		if(menuTrees.size()>0)
		{
			MenuTreeNode childMenuTreeNode = null;
			for(MenuTree menuTree : menuTrees)
			{
				Long menuId = menuTree.getMenuId();
				if(queryAllFlag||menuIds.contains(menuId)) {
					childMenuTreeNode = new MenuTreeNode(menuTree, queryAllFlag);
					
					List<AuthInfo> authInfos = menuAuthDao.findAuthInfoByMenuId(menuId);
					if(authInfos!=null)
					{
						childMenuTreeNode.setAuthInfos(authInfos);
					}
					
					menuTreeNode.addChildNode(childMenuTreeNode);
					
					getMenuChildTree(childMenuTreeNode,menuTreeDao.findByParentId(menuTree.getMenuId()),menuIds,queryAllFlag);
				}
			}
		}
		else
		{
			menuTreeNode.setLeaf(true); 
		}
	}
	
	/**
	 * queryMenuAuthority 获取全部菜单节点权限
	 * 
	 * @return Map 全部菜单节点权限
	 */
	private Map<String, List<AuthInfo>> queryMenuAuthorityAll()
	{
		Map<String, List<AuthInfo>> menuAuthorityMap = new HashMap<String, List<AuthInfo>>();
		//List<MenuAuth> menuAuthorities = roleInfoDao.findMenuAuthorityAll();
		List<MenuAuth> menuAuthorities = menuAuthDao.findAll();
		if (menuAuthorities != null && menuAuthorities.size() > 0)
		{
			String menuIdStr=null;
			for (MenuAuth menuAuthority : menuAuthorities)
			{
				menuIdStr=menuAuthority.getMenuId().toString();
				AuthInfo authInfoTmp = authInfoDao.findOne(menuAuthority.getAuthId());
				if(menuAuthorityMap.get(menuIdStr)==null)
				{
					List<AuthInfo> authorityCoreInfos=new ArrayList<AuthInfo>();
					menuAuthorityMap.put(menuIdStr, authorityCoreInfos);
					authorityCoreInfos.add(authInfoTmp);
				}
				else {
					menuAuthorityMap.get(menuIdStr).add(authInfoTmp);
				}
				
			}
		}
		return menuAuthorityMap;
	}

	/**
	 * 角色编辑前，查询授权和获取角色信息
	 * 
	 * @param roleId 角色ID
	 * @param loginBean 编辑者信息
	 * @return RoleBean
	 */
	public RoleBean beforeUpdateRole(LoginBean loginBean,Long roleId) throws ServiceException
	{
		RoleInfo roleInfo = null;
		if (roleId != null && (roleInfo = roleInfoDao.findOne(roleId)) != null)
		{
			//RoleAuthorityPool.getInstance().syncUpdate(roleInfo);
//			judgePermitEdit(roleInfo,loginBean);
			return po2vo(roleInfo);
		}
		else
		{
			throw new ServiceException("角色不存在");
		}
	}
	
	/**
	 * 判断是否可以删除角色
	 * @param roleBean RoleBean 角色信息
	 * @param loginBean LoginBean 编辑者信息
	 */
	public void checkCanRemoveRole(RoleBean roleBean,LoginBean loginBean) throws ServiceException{
		List<Long> roleIds = roleBean.getRoleIds();
		if (roleIds != null && roleIds.size() > 0)
		{
			for (Long roleId : roleIds)
			{
				if (roleId != null)
				{
					RoleInfo roleInfo = roleInfoDao.findOne(roleId);
					if (roleInfo != null)
					{
						if (roleInfo.getRoleId() >= BaseConst.NORMAL_AUTHORITY_LIMIT)
						{
							//Set userInfos = roleInfo.getUserInfos();
							List<UserInfo> userInfos = userRoleDao.findUserInfoByRoleId(roleId);
							if (userInfos != null && userInfos.size() > 0)
							{
								throw new ServiceException("请先移出角色下用户关联");
							}
						}
						else
						{
							throw new ServiceException("系统角色[拒绝编辑]");
						}
					}
				}
			}
		}
	}
	
	
	@Override
	public void findIsExitRoleByCreator(String userName) throws ServiceException{
		List<RoleInfo> roleInfos =roleInfoDao.findRoleByCreator(userName);
		if(roleInfos.size()>0){
			throw new ServiceException("当前用户存在维护的角色，请先删除角色！");
		}
	}
}
