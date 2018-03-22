package com.nantian.nfcm.bms.auth.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.Predicate;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.nantian.nfcm.bms.auth.dao.OrgDao;
import com.nantian.nfcm.bms.auth.entity.OrgInfo;
import com.nantian.nfcm.bms.auth.entity.UserInfo;
import com.nantian.nfcm.bms.auth.service.OrgService;
import com.nantian.nfcm.bms.auth.vo.OrgTreeNode;
import com.nantian.nfcm.util.DataUtil;
import com.nantian.nfcm.util.DateUtil;
import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.vo.GridData;
import com.nantian.nfcm.util.vo.LoginBean;

/**
 * 机构管理业务逻辑处理
 *
 */
@Service
public class OrgServiceImpl implements OrgService
{
	private static Logger log = Logger.getLogger(OrgServiceImpl.class.getName());

	private OrgDao orgDao;

	@Autowired
	public void setOrgDao(OrgDao orgDao)
	{
		this.orgDao = orgDao;
	}

	/**
	 * 预录入机构信息
	 */
	public OrgTreeNode addOrgInfo(OrgTreeNode orgTreeNode,LoginBean loginBean) throws ServiceException
	{
		OrgInfo parentOrgInfo = orgDao.findOne(Long.parseLong(orgTreeNode.getParentId()));
		if (parentOrgInfo != null)
		{
			String orgName=orgTreeNode.getText();
			if(orgName!=null && orgName.trim().length()>0)
			{
				orgName=orgName.trim();
				List<OrgInfo> orgInfos = orgDao.findByOrgName(orgTreeNode.getText());
				if (orgInfos.size()==0)
				{
					OrgInfo orgInfo = new OrgInfo();
					
					//String orgIdTmp = orgDao.findSequence("SEQ_ORG", 5);
					//orgInfo.setOrgId(orgIdTmp);
					orgInfo.setParentId(Long.parseLong(orgTreeNode.getParentId()));
					orgInfo.setOrgName(orgName);
					String orgCode=orgTreeNode.getOrgCode();
					if(orgCode!=null && orgCode.trim().length()>0)
					{
						//String orgId=OrgPool.getInstance().queryOrgIdByOrgCode(orgCode);
						List<OrgInfo> orgInfosByOrgCode = orgDao.findByOrgCode(orgCode);
						
						if (orgInfosByOrgCode.size()==0)
						{
							orgInfo.setOrgCode(orgTreeNode.getOrgCode());
							orgInfo.setOrgAddr(orgTreeNode.getOrgAddr());
							orgInfo.setOrgManager(orgTreeNode.getOrgManager());
							orgInfo.setOrgTelephone(orgTreeNode.getOrgTelephone());
							orgInfo.setAreaCode(orgTreeNode.getAreaCode());
							orgInfo.setEditor(loginBean.getUserName());
							orgInfo.setLastEditTime(DateUtil.getCurrentTime("yyyy-MM-dd HH:mm:ss"));
							
							//orgInfo.setOrgPath(parentOrgInfo.getOrgPath()+orgIdTmp);
							OrgInfo savedOrgInfo = orgDao.saveAndFlush(orgInfo);
							String orgIdStr =DataUtil.addZeroForNum(savedOrgInfo.getOrgId()+"",5);
							//String orgIdStr = String.format("%05",savedOrgInfo.getOrgId());
							String orgPath = parentOrgInfo.getOrgPath()+orgIdStr;
							savedOrgInfo.setOrgPath(orgPath);
							orgDao.saveAndFlush(savedOrgInfo);
							//OrgPool.getInstance().syncAdd(orgInfo);
							OrgTreeNode orgTreeNodeRet = new OrgTreeNode(orgInfo, true);
							//orgTreeNodeRet.setAccessType(BmsConst.ACCESS_ADD);
							return orgTreeNodeRet;
						}
						else
						{
							orgName=orgInfosByOrgCode.get(0).getOrgName();
							throw new ServiceException("机构号["+orgCode+"]已经被机构["+orgName+"]关联");
						}
					}
					else
					{
						throw new ServiceException("机构号必填！");
					}
				}
				else
				{
					throw new ServiceException("机构["+orgName+"]已经存在！");
				}
			}
			else
			{
				throw new ServiceException("机构名称必填！");
			}
		}
		else
		{
			throw new ServiceException("上级机构已删除！");
		}
	}

	/**
	 * 删除机构信息
	 */
	public void removeOrgInfo(OrgTreeNode orgTreeNode,LoginBean loginBean) throws ServiceException
	{
		List<Long> orgIds = orgTreeNode.getOrgIds();
		List<String> orgCodes = new ArrayList<String>();
		if (orgIds != null && orgIds.size() > 0)
		{
			for (Long orgId : orgIds)
			{
				checkCanRemove(orgId);
				
				OrgInfo orgInfo = orgDao.findOne(orgId);
				if (orgInfo != null)
				{
					String orgName = orgInfo.getOrgName();
					try
					{
						orgDao.delete(orgInfo);
						orgCodes.add(orgInfo.getOrgCode());
					}
					catch (Exception e)
					{
						throw new ServiceException("机构：["+orgName+"] 尚有记录关联,请先删除关联关系!");
					}
				}
			}
			orgTreeNode.setOrgCodes(orgCodes);
		}
		
	}
	/**
	 * 判断是否能删除机构
	 * @param orgId
	 * @throws ServiceException
	 */
	private void checkCanRemove(Long orgId)throws ServiceException{
		//OrgTreeNode orgInfo = OrgPool.getInstance().queryOrgTreeNode(orgId);
		OrgInfo orgInfo = orgDao.findOne(orgId);
		if(orgInfo!=null){
			List<OrgInfo> orgInfos = orgDao.findByParentId(orgId);
			//int childredSize = orgInfo.childrenSize();
			if(orgInfos.size()!=0){
				throw new ServiceException("有子机构,请先删除子机构");
			}
		}
		List<UserInfo> userInfos= orgDao.findUserByOrgId(orgId);
		if(userInfos.size()!=0){
			throw new ServiceException("系统用户属于此机构,此机构不能删除");
		}
	}
	/**
	 * 审批机构
	 */
	/*public OrgTreeNode approveOrg(OrgTreeNode orgTreeNode, String approver)
		throws ServiceException
	{
		OrgInfo orgInfo = orgDao.findOne(orgTreeNode.getId());
		OrgTreeNode orgTreeNodeRet = new OrgTreeNode();
		if (orgInfo != null)
		{
			OrgInfo parentOrg = orgDao.findById(orgInfo.getParentId());
			if (parentOrg != null)
			{
				orgDao.saveObjectFlush(orgInfo);
				OrgPool.getInstance().syncUpdate(orgInfo);
				orgTreeNodeRet= new OrgTreeNode(orgInfo,true);
			}
			else
			{
				throw new ServiceException("org.notExistingParentOrg");
			}
		}
		else
		{
			throw new ServiceException("org.orgDisappear");
		}
		return orgTreeNodeRet;
	}*/

	/**
	 * 获取机构信息
	 */
	public OrgTreeNode queryOrgInfoById(Long orgId) throws ServiceException
	{
		OrgInfo orgInfo = orgDao.findOne(orgId);
		if (orgInfo != null)
		{
			OrgTreeNode orgTreeNodeRet = new OrgTreeNode(orgInfo,true);
			if(orgInfo.getParentId()!=null&&!orgInfo.getParentId().equals("")){
				OrgInfo orgInfoTmp=orgDao.findOne(orgInfo.getParentId());
				orgTreeNodeRet.setParentOrgName(orgInfoTmp.getOrgName());
				orgTreeNodeRet.setParentOrgCode(orgInfoTmp.getOrgCode());
			}
			return orgTreeNodeRet;
		}
		else
		{
			throw new ServiceException("机构已被其他用户删除");
		}
	}

	/**
	 * 更新机构信息
	 */
	public OrgTreeNode updateOrgInfo(OrgTreeNode orgTreeNode,LoginBean loginBean) throws ServiceException
	{
		OrgInfo orgInfo = orgDao.findOne(Long.parseLong(orgTreeNode.getId()));
		if (orgInfo == null){
			throw new ServiceException("不存在编辑的本机机构信息！");
		}
		else{   
			//String parentOrgId=OrgPool.getInstance().queryOrgIdByOrgCode(orgTreeNode.getParentOrgCode());
			List<OrgInfo> orgInfosByOrgCode = orgDao.findByOrgCode(orgTreeNode.getParentOrgCode());
			if(orgInfosByOrgCode.size()>0)
			{
				Long parentOrgId=orgInfosByOrgCode.get(0).getOrgId();
		    	if(parentOrgId!=null&&(""+parentOrgId).equals(orgTreeNode.getParentId())==false && (""+orgTreeNode.getId()).equals("1")==false &&(""+parentOrgId).equals(orgTreeNode.getId())==false){
		    		 //String orgPath=OrgPool.getInstance().queryOrgPathByOrgId(parentOrgId);
		    		 OrgInfo orgInfoTemp = orgDao.findOne(parentOrgId);
		    		 String orgPath=orgInfoTemp.getOrgPath();
		    		 List<OrgInfo> orgInfos = orgDao.findByParentId(Long.parseLong(orgTreeNode.getId()));
		    		if(orgInfos.size()!=0 ){
		    			orgInfo.setParentId(parentOrgId);
						orgInfo.setOrgPath(orgPath+orgTreeNode.getId());
		    			getOrgChild(orgTreeNode.getId(),orgInfos,orgInfo.getOrgId(),orgPath);
		    		}
		    		else{
		    			orgInfo.setParentId(parentOrgId);
						orgInfo.setOrgPath(orgPath+orgTreeNode.getId());
		    		}
		    	}
			}
			
	    	String orgName = orgTreeNode.getText();
			if(orgName!=null && orgName.trim().length()>0)
			{
				boolean orgNameUpdateFlag=false;
				if (!orgInfo.getOrgName().equalsIgnoreCase(orgName))
				{
					orgNameUpdateFlag=true;
					//String oldorgname=OrgPool.getInstance().queryOrgNameByOrgId(orgTreeNode.getId());
					String oldorgname=orgDao.findOne(Long.parseLong(orgTreeNode.getId())).getOrgName();
					List<OrgInfo> orgInfos = orgDao.findByOrgName(orgName);
					if (orgInfos.size()>0 && oldorgname.equals(orgName)==false)
					{
						throw new ServiceException("机构["+orgName+"]已经存在！");
					}
				}
				String orgCode=orgTreeNode.getOrgCode();
				if(orgCode!=null && orgCode.trim().length()>0)
				{
					String oldOrgCode = orgInfo.getOrgCode();
					if (!orgCode.equalsIgnoreCase(oldOrgCode))
					{
						//String orgIdByorgCode=OrgPool.getInstance().queryOrgIdByOrgCode(orgCode);
						List<OrgInfo> orgByOrgCode = orgDao.findByOrgCode(orgCode);
						Long orgIdByorgCode=orgByOrgCode.get(0).getOrgId();
						if (orgIdByorgCode != null)
						{
							//orgName=OrgPool.getInstance().queryOrgNameByOrgId(orgIdByorgCode);
							orgName=orgDao.findOne(orgIdByorgCode).getOrgName();
							//throw new ServiceException("org.orgCodeAssociated",new String[] {orgCode,orgName});
							throw new ServiceException("机构号["+orgCode+"]已经被机构["+orgName+"]关联");
						}
					}
					orgInfo.setOrgName(orgName);
					orgInfo.setAreaCode(orgTreeNode.getAreaCode());
					orgInfo.setOrgCode(orgTreeNode.getOrgCode());
					orgInfo.setOrgAddr(orgTreeNode.getOrgAddr());
					orgInfo.setOrgManager(orgTreeNode.getOrgManager());
					orgInfo.setOrgTelephone(orgTreeNode.getOrgTelephone());
					orgInfo.setEditor(loginBean.getUserName());
					orgInfo.setLastEditTime(DateUtil.getCurrentTime("yyyy-MM-dd HH:mm:ss"));
					orgDao.saveAndFlush(orgInfo);
					//OrgPool.getInstance().syncUpdate(orgInfo);
					if (orgNameUpdateFlag)
					{
						//DevPool.getInstance().syncOrgUpdate(orgInfo);
					}
					OrgTreeNode orgTreeNodeRet=new OrgTreeNode(orgInfo,true);
					orgTreeNodeRet.setOldOrgCode(oldOrgCode);
					//orgTreeNodeRet.setAccessType(BmsConst.ACCESS_UPDATE);
					return orgTreeNodeRet;
				}
				else
				{
					throw new ServiceException("机构号必填！");
				}
			}
			else
			{
				throw new ServiceException("机构名称必填！");
			}
		}	
	}
	public void getOrgChild(String orgId,List<OrgInfo> orgInfos,Long parentOrgId,String orgPath)
	{
	   for(OrgInfo orginfo:orgInfos){
			orginfo.setOrgPath(orgPath+orginfo.getOrgId());
			orginfo.setParentId(parentOrgId);
			orgDao.saveAndFlush(orginfo);
			//OrgPool.getInstance().syncUpdate(orginfo);
			OrgTreeNode orgTreeNodeRet=new OrgTreeNode(orginfo,true);
			//orgTreeNodeRet.setAccessType(BmsConst.ACCESS_UPDATE);
			List<OrgInfo> neworgInfos = orgDao.findByParentId(orginfo.getOrgId());
			if(neworgInfos.size()>0){
				getOrgChildofChild(neworgInfos,orginfo.getOrgPath());
			}	
	   } 
	}
	public void getOrgChildofChild(List<OrgInfo> neworgInfos,String orgPath)
	{
		  for(OrgInfo neworginfo:neworgInfos){
			    neworginfo.setOrgPath(orgPath+neworginfo.getOrgId());
				orgDao.saveAndFlush(neworginfo);
				//OrgPool.getInstance().syncUpdate(neworginfo);
				OrgTreeNode orgTreeNodeRet=new OrgTreeNode(neworginfo,true);
				//orgTreeNodeRet.setAccessType(BmsConst.ACCESS_UPDATE);
				List<OrgInfo> orgInfos = orgDao.findByParentId(neworginfo.getOrgId());
				if(neworgInfos.size()>0){
					getOrgChildofChild(orgInfos,neworginfo.getOrgPath());
				}	
		   } 
	}

	@SuppressWarnings("unchecked")
	public OrgTreeNode getRootOrgTree()
	{
		//OrgTreeNode orgTreeNode = OrgPool.getInstance().queryOrgTreeNode(orgId);
		OrgInfo orgTreeNode=orgDao.getOrgRoot();
		//OrgInfo orgTreeNode = orgDao.findOne(orgId);
		OrgTreeNode orgTreeNodeRet = new OrgTreeNode(orgTreeNode,true);
		//getChildrenApproveOrgTree(orgTreeNodeRet, (List<OrgTreeNode>) orgTreeNode.getChildren());
		getChildrenOrgTree(orgTreeNodeRet, orgDao.findByParentId(orgTreeNode.getOrgId()));
		return orgTreeNodeRet;
	}
	
	@SuppressWarnings("unchecked")
	public OrgTreeNode getApproveOrgTree(Long orgId)
	{
		//OrgTreeNode orgTreeNode = OrgPool.getInstance().queryOrgTreeNode(orgId);
		//OrgInfo orgTreeNode=orgDao.getOrgRoot();
		OrgInfo orgTreeNode = orgDao.findOne(orgId);
		OrgTreeNode orgTreeNodeRet = new OrgTreeNode(orgTreeNode,true);
		//getChildrenApproveOrgTree(orgTreeNodeRet, (List<OrgTreeNode>) orgTreeNode.getChildren());
		getChildrenOrgTree(orgTreeNodeRet, orgDao.findByParentId(orgId));
		return orgTreeNodeRet;
	}
	
	private void getChildrenOrgTree(OrgTreeNode orgTreeNode, List<OrgInfo> orgInfos)
	{
		if(orgInfos.size()>0)
		{
			OrgTreeNode childOrgTreeNode = null;
			for(OrgInfo orgInfo : orgInfos)
			{
				Long orgId = orgInfo.getOrgId();
				
				childOrgTreeNode = new OrgTreeNode(orgInfo, true);
				
				/*List<AuthInfo> authInfos = menuAuthDao.findAuthInfoByMenuId(menuId);
				if(authInfos!=null)
				{
					childMenuTreeNode.setAuthInfos(authInfos);
				}*/
				
				orgTreeNode.addChildNode(childOrgTreeNode);
				
				getChildrenOrgTree(childOrgTreeNode,orgDao.findByParentId(orgId));
			
			}
		}
		else
		{
			orgTreeNode.setLeaf(true); 
		}
	}

	/*@SuppressWarnings("unchecked")
	public void getChildrenApproveOrgTree(OrgTreeNode orgTreeNodeRet,
			List<OrgTreeNode> orgTreeNodeChildren)
	{
		OrgTreeNode childOrgTreeNodeRet = null;
		for (OrgTreeNode childOrgTreeNode : orgTreeNodeChildren)
		{
				childOrgTreeNodeRet = new OrgTreeNode(childOrgTreeNode);
				orgTreeNodeRet.addChildNode(childOrgTreeNodeRet);
				getChildrenApproveOrgTree(childOrgTreeNodeRet,(List<OrgTreeNode>) childOrgTreeNode.getChildren());
		}
		if (orgTreeNodeRet.childrenSize() == 0)
		{
			orgTreeNodeRet.setLeaf(true);
		}
	}*/

	/*public GridData queryNoApprovedOrgInfos(int start,int limit,String orgId)
	{
		List orgTreeNodes = new ArrayList();
		GridData gridData = orgDao.queryNoApprovedOrgInfosByParentId(start,limit,orgId);
		List<Object> orgInfos = gridData.getData();
		if (orgInfos != null && orgInfos.size() > 0)
		{
			OrgInfo orgInfo = null;
			OrgTreeNode orgTreeNode = null;
			for (Object obj : orgInfos)
			{
				orgInfo = (OrgInfo) obj;
				orgTreeNode = new OrgTreeNode(orgInfo,true);
				orgTreeNode.setParentOrgName(orgDao.findById(orgInfo.getParentId())
						.getOrgName());
				orgTreeNodes.add(orgTreeNode);
			}
		}
		gridData.setData(orgTreeNodes);
		return gridData;
	}*/
	
	/*public GridData queryApprovedOrgInfos(int start,int limit,String orgId)
	{
		List orgTreeNodes = new ArrayList();
		GridData gridData = orgDao.queryApprovedOrgInfosByParentId(start,limit,orgId);
		List<Object> orgInfos = gridData.getData();
		if (orgInfos != null && orgInfos.size() > 0)
		{
			OrgInfo orgInfo = null;
			OrgTreeNode orgTreeNode = null;
			for (Object obj : orgInfos)
			{
				orgInfo = (OrgInfo) obj;
				orgTreeNode = new OrgTreeNode(orgInfo,true);
				orgTreeNode.setParentOrgName(orgDao.findOne(orgInfo.getParentId())
						.getOrgName());
				orgTreeNodes.add(orgTreeNode);
			}
		}
		gridData.setData(orgTreeNodes);
		return gridData;
	}*/
	
	public GridData<OrgTreeNode> findByCondition(int page, int size, Long orgId) throws ServiceException {
        Pageable pageable = new PageRequest(page, size);
        Specification<OrgInfo> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (orgId != null && !orgId.equals("")) {
                Predicate orgIdp = criteriaBuilder.equal(root.get("orgId").as(Long.class),orgId );
                predicates.add(orgIdp);
            }
            query.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
            return query.getRestriction();
        };
        Page<OrgInfo> orgInfoPage = orgDao.findAll(specification, pageable);
        List<OrgInfo> orgInfos = orgInfoPage.getContent();
        List<OrgTreeNode> orgTreeNodes = new ArrayList<>();
        OrgTreeNode orgTreeNode = null;
        for (OrgInfo orgInfo : orgInfos) {
        	orgTreeNode = new OrgTreeNode(orgInfo,true);
			orgTreeNode.setParentOrgName(orgDao.findOne(orgInfo.getParentId())
					.getOrgName());
			orgTreeNodes.add(orgTreeNode);
        }
        GridData<OrgTreeNode> gridData = new GridData<>();
        gridData.setData(orgTreeNodes);
        gridData.setNumber(orgInfoPage.getTotalElements());
        gridData.setPage(orgInfoPage.getNumber());
        gridData.setTotalPage(orgInfoPage.getTotalPages());
        return gridData;
    }


	public List<OrgInfo> queryApproveOrgInfoChildren(Long orgId) throws ServiceException
	{
		List orgInfoList = null;
		if((orgId+"").length()==2)
		{
			orgInfoList= orgDao.findByParentId(orgId);
		}
		else
		{
			throw new ServiceException("notPermissions");
		}
		return orgInfoList;
	}

	public HashMap<String, OrgInfo> queryApprovedOrgInfos()
			throws ServiceException
	{
		List<OrgInfo> orgInfoList = null;
		Map<String, OrgInfo> orgInfoMap = new HashMap<String, OrgInfo>();
		orgInfoList = orgDao.findAll();
		for(OrgInfo orgInfo : orgInfoList){
			if(orgInfo != null && orgInfo.getOrgCode() != null && !orgInfo.getOrgCode().equals("")){
				orgInfoMap.put(orgInfo.getOrgCode(), orgInfo);
			}
		}
		return (HashMap<String, OrgInfo>) orgInfoMap;
	}

	public OrgInfo addOrgInfo(OrgInfo orgInfo) throws ServiceException
	{
		OrgInfo orgInfoTemp = orgDao.findOne(orgInfo.getParentId());
		orgInfo.setParentId(orgInfoTemp.getOrgId());
		//orgInfo.setParentId(OrgPool.getInstance().queryOrgIdByOrgCode(orgInfo.getParentOrgCode()));
		//TODO
		//orgInfo.setOrgId(orgDao.generateOrgId(orgInfo.getParentId(),OrgPool.getInstance().getOrgIdGradingLen()));
		String orgCode = orgInfo.getOrgCode();
		if(orgCode!=null && orgCode.trim().length()>0)
		{
			OrgInfo savedOrgInfo = orgDao.saveAndFlush(orgInfo);
			String orgIdStr =DataUtil.addZeroForNum(savedOrgInfo.getOrgId()+"",5);
			//String orgIdStr = String.format("%05",savedOrgInfo.getOrgId());
			String orgPath = orgInfoTemp.getOrgPath()+orgIdStr;
			savedOrgInfo.setOrgPath(orgPath);
			orgDao.saveAndFlush(savedOrgInfo);
		}
		return orgInfo;
	}
	
	/**
	 * 更新机构信息
	 */
	public OrgInfo updateOrgInfo(OrgInfo orgInfoIn) throws ServiceException
	{
		OrgInfo orgInfo = orgDao.findOne(orgInfoIn.getOrgId());
		if (orgInfo != null)
		{
			String orgName = orgInfoIn.getOrgName();
			boolean orgNameUpdateFlag=false;
			if (!orgInfo.getOrgName().equalsIgnoreCase(orgName))
			{
				orgNameUpdateFlag=true;
			}
			orgInfo.setOrgName(orgInfoIn.getOrgName());
			orgInfo.setOrgAddr(orgInfoIn.getOrgAddr());
			orgInfo.setOrgManager(orgInfoIn.getOrgManager());
			orgInfo.setOrgTelephone(orgInfoIn.getOrgTelephone());
			orgDao.saveAndFlush(orgInfo);
			//OrgPool.getInstance().syncUpdate(orgInfo);
			if (orgNameUpdateFlag)
			{
				//DevPool.getInstance().syncOrgUpdate(orgInfo);
			}
		}
		return orgInfo;
	}
	
	
	public List<OrgTreeNode> queryOrgInfoByParentId(String parentId,Long userOrgId) throws ServiceException{
		//List<OrgInfo> orgInfos = orgDao.queryByParentId(parentId,userOrgId);
		List<OrgInfo> orgInfos = new ArrayList<>();
		if(parentId==null||parentId.equals(""))
		{
			orgInfos.add(orgDao.findOne(userOrgId));
		}
		else {
			
			orgInfos=orgDao.findByParentId(Long.parseLong(parentId));
		}
		List<OrgTreeNode> orgTreeNodes = new ArrayList<OrgTreeNode>();
		if(orgInfos!=null){
			for(int i=0;i<orgInfos.size();i++){
				OrgTreeNode orgTreeNode = new OrgTreeNode(orgInfos.get(i),true);
				//OrgTreeNode orgTreeNodInPool  = OrgPool.getInstance().queryOrgTreeNode(orgTreeNode.getId());
				List<OrgInfo> orgInfosTemp = orgDao.findByParentId(Long.parseLong(orgTreeNode.getId()));
				//int childrenSize = orgTreeNodInPool.childrenSize();
				if(orgInfosTemp.size()>0){
					orgTreeNode.setLeaf(false);
				}else{
					orgTreeNode.setLeaf(true);
				}
				
				orgTreeNodes.add(orgTreeNode);
			}
		}
		return orgTreeNodes;
	}
	/**
	 * 校验能否删除机构
	 * 如果该机构无子机构，可以删除；否则，不能删除
	 * @param orgId
	 */
		public void checkIsRemoveOrg(Long orgId) throws ServiceException{
			checkCanRemove(orgId);
		}
		
	
}




