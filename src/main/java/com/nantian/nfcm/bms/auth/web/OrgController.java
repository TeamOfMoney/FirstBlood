package com.nantian.nfcm.bms.auth.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nantian.nfcm.bms.auth.service.OrgService;
import com.nantian.nfcm.bms.auth.vo.OrgTreeNode;
import com.nantian.nfcm.util.vo.GridData;
import com.nantian.nfcm.util.vo.LoginBean;
import com.nantian.nfcm.util.vo.ResultInfo;


@Controller
@RequestMapping("/org")
public class OrgController
{

	private static Logger log = Logger.getLogger(OrgController.class.getName());
	private OrgService orgService;
    @Autowired
    public OrgController(OrgService orgService) {
        this.orgService = orgService;
    }
	//private OrgTreeNode orgTreeNode = new OrgTreeNode();

	@RequestMapping("/checkIsRemoveOrg")
    @ResponseBody
	public ResultInfo checkIsRemoveOrg(OrgTreeNode orgTreeNode) throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			orgService.checkIsRemoveOrg(Long.parseLong(orgTreeNode.getId()));
			//resultInfo.setData(resultInfo);
            resultInfo.setSuccess("true");
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
	/**
	 * 新增机构信息
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/addOrgInfo")
    @ResponseBody
	public ResultInfo addOrgInfo(HttpServletRequest request,OrgTreeNode orgTreeNode) throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			LoginBean loginBean=(LoginBean)request.getSession().getAttribute("loginInfo");
			OrgTreeNode orgTreeNodeRet = orgService.addOrgInfo(orgTreeNode,loginBean);
			
			resultInfo.setData(orgTreeNodeRet);
            resultInfo.setSuccess("true");
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}

	/**
	 * 更新机构信息
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/updateOrgInfo")
    @ResponseBody
	public ResultInfo updateOrgInfo(HttpServletRequest request,OrgTreeNode orgTreeNode) throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			LoginBean loginBean=(LoginBean)request.getSession().getAttribute("loginInfo");
			OrgTreeNode orgTreeNodeRet = orgService.updateOrgInfo(orgTreeNode,loginBean);
			
			resultInfo.setData(orgTreeNodeRet);
            resultInfo.setSuccess("true");
			
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}

	/**
	 * 删除机构信息
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/removeOrgInfo")
    @ResponseBody
	public ResultInfo removeOrgInfo(HttpServletRequest request,OrgTreeNode orgTreeNode) throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			LoginBean loginBean=(LoginBean)request.getSession().getAttribute("loginInfo");
			orgService.removeOrgInfo(orgTreeNode,loginBean);
			//OrgPool.getInstance().syncRemove(orgTreeNode);
			//orgTreeNode.setAccessType(BmsConst.ACCESS_DELETE);
			resultInfo.setData(orgTreeNode);
            resultInfo.setSuccess("true");
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
	
	/**
	 * 获得机构树
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/getOrgTreeSync")
    @ResponseBody
	public ResultInfo getOrgTreeSync(HttpServletRequest request) throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			
			Long userOrgId = ((LoginBean) request.getSession().getAttribute("loginInfo")).getOrgId();
			OrgTreeNode orgTreeNode = orgService.getApproveOrgTree(userOrgId);
			resultInfo.setData(orgTreeNode);
			resultInfo.setSuccess("true");
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}

	
	/**
	 * 获得某机构下已审批的机构信息列表
	 * 
	 * @throws Exception
	 */ 
	@RequestMapping("/queryApprovedOrgInfos")
    @ResponseBody
	public ResultInfo queryApprovedOrgInfos(int page, int size,OrgTreeNode orgTreeNode) throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			GridData gridData = orgService.findByCondition(page,size,Long.parseLong(orgTreeNode.getId()));
			resultInfo.setNumber(gridData.getNumber());
			resultInfo.setData(gridData.getData());
			resultInfo.setSuccess("true");
			
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}

	@RequestMapping("/queryOrgInfo")
    @ResponseBody
	public ResultInfo queryOrgInfo(OrgTreeNode orgTreeNode) throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			OrgTreeNode orgTreeNodeRet = orgService.queryOrgInfoById(Long.parseLong(orgTreeNode.getId()));
			resultInfo.setData(orgTreeNodeRet);
			resultInfo.setSuccess("true");
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
	/**
	 * 查询出机构号重复的数据
	 * 
	 * @throws Exception
	 */
	/*@RequestMapping("/queryOrgInfoByOrgCodeRepeat")
    @ResponseBody
	public void queryOrgInfoByOrgCodeRepeat() throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try {
			List list = reportService.queryReportDataList("queryOrgCodeRepeat", new HashMap<String, String>());
			resultInfo.setNumber(list.size());
			resultInfo.setData(list);
			resultInfo.setSuccess("true");
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
	}*/
	
	@RequestMapping("/getOrgTree")
    @ResponseBody
	public ResultInfo getOrgTree() throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			OrgTreeNode orgTreeNode = orgService.getRootOrgTree();
			resultInfo.setData(orgTreeNode);
			resultInfo.setSuccess("true");
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
	
	
	@RequestMapping("/queryOrgInfoByParentId")
    @ResponseBody
	public ResultInfo queryOrgInfoByParentId(HttpServletRequest request,OrgTreeNode orgTreeNode) throws Exception
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			
			Long userOrgId = ((LoginBean) request.getSession().getAttribute("loginInfo")).getOrgId();
			
			List<OrgTreeNode> list = orgService.queryOrgInfoByParentId(orgTreeNode.getId(),userOrgId);
			resultInfo.setData(list);
			resultInfo.setSuccess("true");
		}
		catch (Exception e)
		{
			log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
}