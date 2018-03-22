package com.nantian.nfcm.bms.auth.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nantian.nfcm.bms.auth.entity.OrgInfo;
import com.nantian.nfcm.bms.auth.vo.OrgTreeNode;
import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.vo.GridData;
import com.nantian.nfcm.util.vo.LoginBean;


/**
 * 机构信息管理
 */

public interface OrgService
{
  /**
   * 校验能否删除机构
   * 如果该机构无子机构，可以删除；否则，不能删除
   * @param orgId
   */
	public void checkIsRemoveOrg(Long orgId) throws ServiceException;
	
	
	/**
	 * 根据机构ID查询机构信息
	 * @param orgId
	 * @param userName
	 * @return OrgTreeNode
	 */
	public OrgTreeNode queryOrgInfoById(Long orgId) throws ServiceException;
	
	/**
	 * 预录入机构信息（默认未审批）
	 * @param orgTreeNode
	 * @return OrgTreeNode
	 * @param logBean
	 * @throws ServiceException
	 */
	public OrgTreeNode addOrgInfo(OrgTreeNode orgTreeNode,LoginBean loginBean) throws ServiceException;
  
	/**
	 * 更新机构信息
	 * @param orgTreeNode
	 * @return OrgTreeNode
	 * @param logBean
	 * @throws ServiceException
	 */
	public OrgTreeNode updateOrgInfo(OrgTreeNode orgTreeNode,LoginBean loginBean) throws ServiceException;
	/**
	 * 删除机构信息
	 * @param loginBean 
	 * @param orgBean
	 * @param logBean
	 * @throws ServiceException
	 */
	public void removeOrgInfo(OrgTreeNode orgTreeNode, LoginBean loginBean) throws ServiceException;
	
	/**
	 * 审批机构信息
	 * @param orgTreeNode
	 * @param userName
	 * @return OrgTreeNode
	 * @throws ServiceException
	 */
	//public OrgTreeNode approveOrg(OrgTreeNode orgTreeNode,String userName)throws ServiceException;
  
  /**
   * 获取已审批机构树
   * @param orgId
   * @return OrgTreeNode
   */
  public OrgTreeNode getApproveOrgTree(Long orgId);
  
  /**
   * 获取已审批机构树
   * @param orgId
   * @return OrgTreeNode
   */
  public OrgTreeNode getRootOrgTree();
  
  /**
   * 获取某机构下的机构信息列表
   * @param start
   * @param limit
   * @param orgId
   * @return
   */
  //public GridData queryNoApprovedOrgInfos(int start,int limit,String orgId);
  /**
   * 获取某机构下的已审批机构信息列表
   * @param orgId
   * @return
   */
  public List<OrgInfo> queryApproveOrgInfoChildren(Long orgId)throws ServiceException;
  
  public HashMap<String, OrgInfo> queryApprovedOrgInfos()throws ServiceException;
  
  public OrgInfo addOrgInfo(OrgInfo orgInfo) throws ServiceException;

//public GridData queryApprovedOrgInfos(int start, int limit, String id)throws ServiceException;
public GridData<OrgTreeNode> findByCondition(int page, int size, Long orgId) throws ServiceException; 
public List<OrgTreeNode> queryOrgInfoByParentId(String id, Long userOrgId)throws ServiceException;
}