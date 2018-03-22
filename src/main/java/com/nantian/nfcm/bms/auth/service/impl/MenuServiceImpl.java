package com.nantian.nfcm.bms.auth.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nantian.nfcm.bms.auth.dao.AuthInfoDao;
import com.nantian.nfcm.bms.auth.dao.MenuAuthDao;
import com.nantian.nfcm.bms.auth.dao.MenuTreeDao;
import com.nantian.nfcm.bms.auth.entity.AuthInfo;
import com.nantian.nfcm.bms.auth.entity.MenuAuth;
import com.nantian.nfcm.bms.auth.entity.MenuTree;
import com.nantian.nfcm.bms.auth.service.MenuService;
import com.nantian.nfcm.bms.auth.vo.MenuTreeNode;
import com.nantian.nfcm.util.BaseConst;
import com.nantian.nfcm.util.ServiceException;



@SuppressWarnings("unchecked")
@Service
public class MenuServiceImpl implements MenuService
{
	@Autowired
	private MenuTreeDao menuTreeDao;
	@Autowired
	private MenuAuthDao menuAuthDao;
	@Autowired
	private AuthInfoDao authInfoDao;	
	@Override
	public MenuTreeNode getMenuTree(List<Long> menuIds) throws ServiceException
	{
		return initMenuTree(menuIds,false);
	}
	
	@Override
	public MenuTreeNode getMenuTreeAll() throws ServiceException
	{
		return initMenuTree(null,true);
	}
	
	@Override
	public MenuTreeNode findMenuById(String menuNodeId) throws ServiceException
	{
		MenuTree menuTree=null;
		if(menuNodeId!=null && (menuTree=menuTreeDao.findOne(Long.valueOf(menuNodeId)))!=null)
		{
			return po2vo(menuTree);
		}
		else
		{
			throw new ServiceException("菜单项已不存在");
		}
	}
	
	@Override
	public MenuTreeNode addMenu(MenuTreeNode menuTreeNode) throws ServiceException
	{
		//获得menuText
		String menuText=menuTreeNode.getText();
		//根据menu_text和父亲Id获取树
		List<MenuTree> menuList = menuTreeDao.findByParentIdAndMenutext(menuTreeNode
				.getParentId(), menuText);
		if (menuList != null && menuList.size() > 0)//如果有值说明重复
		{
			throw new ServiceException("菜单名已存在");
		}
		else
		{
			//创建一个菜单树并且赋值
			MenuTree menuTree=new MenuTree();
			menuTree.setParentId(menuTreeNode.getParentId());
			menuTree.setMenuText(menuText);
			menuTree.setIconText(menuTreeNode.getIconText());
			Long nodeType=menuTreeNode.getNodeType()==null?new Long(BaseConst.MIDDLE_NODE):menuTreeNode.getNodeType();
			menuTree.setNodeType(nodeType);
			menuTree.setUrlText(menuTreeNode.getUrlText());
			menuTree.setOrderFlag(menuTreeNode.getOrderFlag());
			menuTreeDao.saveAndFlush(menuTree);//直接先保存菜单信息
			
			//终端上传菜单权限添加
			List<AuthInfo> authInfos = menuTreeNode.getAuthInfos();
			for(AuthInfo authInfo:authInfos)
			{
				MenuAuth menuAuth = new MenuAuth();
				
				menuAuth.setMenuId(menuTree.getMenuId());
				AuthInfo authInfoTmp = authInfoDao.saveAndFlush(authInfo);
				menuAuth.setAuthId(authInfoTmp.getAuthId());
				
				menuAuthDao.saveAndFlush(menuAuth);
			}
			return po2vo(menuTree);
		}
		
	}
	
	@Override
	public MenuTreeNode updateMenu(MenuTreeNode menuTreeNode) throws ServiceException
	{
		String menuText=menuTreeNode.getText();//获取子菜单名字
		MenuTree menuTreeRet=menuTreeDao.findOne(Long.valueOf(menuTreeNode.getId()));//根据id获取菜单树信息
		if(menuTreeRet==null)
		{
			throw new ServiceException("菜单已被其它用户删除");
		}
		else
		{
			if (!menuText.equals(menuTreeRet.getMenuText()))
			{
				List<MenuTree> menuList = menuTreeDao.findByParentIdAndMenutext(menuTreeRet.getParentId(), menuText);
				if (menuList != null && menuList.size() > 0)
				{
					throw new ServiceException("菜单名已存在");
				}
			}
			menuTreeRet.setMenuText(menuText);
			menuTreeRet.setUrlText(menuTreeNode.getUrlText());
			menuTreeRet.setIconText(menuTreeNode.getIconText());
			menuTreeDao.saveAndFlush(menuTreeRet);
			
			
			//菜单原有权限
			List<AuthInfo> authInfosRet = menuAuthDao.findAuthInfoByMenuId(menuTreeRet.getMenuId());
			//终端上传菜单权限
			List<AuthInfo> authInfos = menuTreeNode.getAuthInfos();
			List<AuthInfo> addList = new ArrayList<>();
			List<AuthInfo> updateList = new ArrayList<>();
			List<AuthInfo> deleteList = new ArrayList<>();
			
			//原来没有权限，上传有权限
			if(authInfos.size()>0&&authInfosRet.size()==0)
			{
				addList=authInfos;
			}
			//原来有，上传没有
			else if(authInfos.size()==0&&authInfosRet.size()>0)
			{
				deleteList=authInfosRet;
			}
			else if(authInfos.size()>0&&authInfosRet.size()>0)
			{
				List<Long> authIds=new ArrayList<>();
				List<Long> authRetIds=new ArrayList<>();
				for(AuthInfo authInfoRet:authInfosRet)
				{
					Long authRetId = authInfoRet.getAuthId();
					
					authRetIds.add(authRetId);
					//deleteList.add(authInfoRet);
				}
				for(AuthInfo authInfo:authInfos)
				{
					//addList.add(authInfo);
					Long authId=authInfo.getAuthId();
					String authPath=authInfo.getServerPath();
					if(authId==null&&(!"".equals(authPath)||authPath!=null))
					{
						addList.add(authInfo);
					}
					else
					{
						authIds.add(authId);
					}
				}
				
				//获取重复的id
				List jiaoji=authIds;
				jiaoji.retainAll(authRetIds);
				//获取原有多余的id
				List chaji = authRetIds;
				chaji.removeAll(authIds);
				
				for(AuthInfo authInfo:authInfos)
				{
					if(jiaoji.contains(authInfo.getAuthId()))
					{
						updateList.add(authInfo);
					}
					
				}
				for(AuthInfo authInfo:authInfosRet)
				{
					if(chaji.contains(authInfo.getAuthId()))
					{
						deleteList.add(authInfo);
					}
				}
				
				
				/*List<Long> authIds=new ArrayList<>();
				List<Long> authRetIds=new ArrayList<>();
				for(AuthInfo authInfoRet:authInfosRet)
				{
					Long authRetId = authInfoRet.getAuthId();
					
					authRetIds.add(authRetId);
				}
				for(AuthInfo authInfo:authInfos)
				{
					Long authId=authInfo.getAuthId();
					String authPath=authInfo.getServerPath();
					if(authId==null&&(!"".equals(authPath)||authPath!=null))
					{
						addList.add(authInfo);
					}
					else if(authId!=null&&("".equals(authPath)||authPath==null))
					{
						deleteList.add(authInfo);
					}
					else
					{
						authIds.add(authId);
					}
				}
				//获取重复的id
				List jiaoji=authIds;
				jiaoji.retainAll(authRetIds);
				
				
				//获取原有多余的id
				List chaji = authRetIds;
				chaji.remove(authIds);
				
				for(AuthInfo authInfo:authInfos)
				{
					if(jiaoji.contains(authInfo.getAuthId()))
					{
						updateList.add(authInfo);
					}
					else if(chaji.contains(authInfo.getAuthId()))
					{
						deleteList.add(authInfo);
					}
				}*/
				
			}
			
			
			
			if(deleteList.size()>0)
			{
				for(AuthInfo authInfo:deleteList)
				{
					List<MenuAuth> menuAuths = menuAuthDao.findMenuAuthByAuthIdAndMenuId(authInfo.getAuthId(),menuTreeRet.getMenuId());
					for(MenuAuth menuAuth:menuAuths)
					{
						menuAuthDao.delete(menuAuth);
					}
					authInfoDao.delete(authInfo);	
				}
			}
			if(addList.size()>0)
			{
				for(AuthInfo authInfo:addList)
				{
					MenuAuth menuAuth = new MenuAuth();
					menuAuth.setMenuId(menuTreeRet.getMenuId());
					//先保存再获取id
					AuthInfo authInfoTmp = authInfoDao.saveAndFlush(authInfo);
					menuAuth.setAuthId(authInfoTmp.getAuthId());
					menuAuthDao.saveAndFlush(menuAuth);
				}
			}
			if(updateList.size()>0)
			{
				for(AuthInfo authInfo:updateList)
				{
					authInfoDao.saveAndFlush(authInfo);	
				}
			}
		}
		return po2vo(menuTreeRet);
	}
	
	@Override
	public void removeMenu(MenuTreeNode menuTreeNode) throws ServiceException
	{
		MenuTree menuTreeDel=menuTreeDao.findOne(Long.valueOf(menuTreeNode.getId()));
		if (menuTreeDel != null)
		{
			List<MenuTree> menuList = menuTreeDao.findByParentId(menuTreeDel.getMenuId());
			if (menuList != null && menuList.size() > 0)
			{
				throw new ServiceException("请先删除子菜单");
			}
			else
			{
				List<MenuAuth> menuAuths = menuAuthDao.findMenuAuthByMenuId(menuTreeDel.getMenuId());
				List<AuthInfo> authInfos = menuAuthDao.findAuthInfoByMenuId(menuTreeDel.getMenuId());
				for(MenuAuth menuAuth:menuAuths)
				{
					menuAuthDao.delete(menuAuth);
				}
				for(AuthInfo authInfo:authInfos)
				{
					authInfoDao.delete(authInfo);
				}
				menuTreeDao.delete(menuTreeDel);
			}
		}
		
	}
	
	/**
	 * 由MenuTree对象转换获取MenuTreeNode对象
	 * @param menuTree MenuTree MenuTree对象
	 * @return MenuTreeNode
	 */
	private MenuTreeNode po2vo(MenuTree menuTree)
	{
		MenuTreeNode menuTreeNode=new MenuTreeNode();
		menuTreeNode.setId(menuTree.getMenuId().toString());
		menuTreeNode.setParentId(menuTree.getParentId());
		menuTreeNode.setText(menuTree.getMenuText());
		menuTreeNode.setIconText(menuTree.getIconText());
		menuTreeNode.setNodeType(menuTree.getNodeType());
		menuTreeNode.setUrlText(menuTree.getUrlText());
		menuTreeNode.setOrderFlag(menuTree.getOrderFlag());
		List<AuthInfo> authInfos = menuAuthDao.findAuthInfoByMenuId(menuTree.getMenuId());
		if(authInfos!=null)
		{
			menuTreeNode.setAuthInfos(authInfos);
		}
		
		return menuTreeNode;
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
}
