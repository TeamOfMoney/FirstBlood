package com.nantian.nfcm.bms.auth.web;

import com.nantian.nfcm.bms.auth.entity.RoleInfo;
import com.nantian.nfcm.bms.auth.service.RoleInfoService;
import com.nantian.nfcm.bms.auth.vo.RoleBean;
import com.nantian.nfcm.util.vo.CheckTreeNode;
import com.nantian.nfcm.util.vo.LoginBean;
import com.nantian.nfcm.util.vo.ResultInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/role")
public class RoleInfoController {
    private static Logger log = LoggerFactory.getLogger(RoleInfoController.class);
    private RoleInfoService roleInfoService;

    public RoleInfoController(RoleInfoService roleInfoService) {
        this.roleInfoService = roleInfoService;
    }

   

    @RequestMapping("/findById")
    @ResponseBody
    private ResultInfo findById(RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            Long roleId = roleBean.getRoleId();
            RoleBean roleBeanRet = roleInfoService.findById(roleId);
            resultInfo.setSuccess("true");
            resultInfo.setData(roleBeanRet);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/findByCondition")
    @ResponseBody
    private ResultInfo findByCondition(int page, int size, RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            Page<RoleInfo> pages = roleInfoService.findByCondition(page, size, roleBean);
            resultInfo.setData(pages.getContent());
            resultInfo.setNumber(pages.getTotalElements());
            resultInfo.setPage(pages.getNumber());
            resultInfo.setTotalPage(pages.getTotalPages());
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/addRole")
    @ResponseBody
    private ResultInfo addRole(HttpServletRequest request,RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	 HttpSession session = request.getSession();
          	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
            RoleInfo roleInfo = roleInfoService.addRoleInfo(roleBean,loginBean);
            resultInfo.setSuccess("true");
            resultInfo.setData(roleInfo);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/updateRole")
    @ResponseBody
    private ResultInfo updateRole(RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	RoleBean roleBeanRet = roleInfoService.updateRoleInfo(roleBean);
            resultInfo.setSuccess("true");
            resultInfo.setData(roleBeanRet);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/delRole")
    @ResponseBody
    private ResultInfo delRole(RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            roleInfoService.delRoleInfo(roleBean);
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
    
    @RequestMapping("/loadAuthorityCheckTree")
    @ResponseBody
    private ResultInfo loadAuthorityCheckTree(HttpServletRequest request,RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	 HttpSession session = request.getSession();
        	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
        	CheckTreeNode checkTreeNode = roleInfoService.loadAuthorityCheckTree(loginBean,roleBean.getRoleId());
            resultInfo.setData(checkTreeNode);
           
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
    
    
    @RequestMapping("/beforeUpdateRole")
    @ResponseBody
    private ResultInfo beforeUpdateRole(HttpServletRequest request,RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	 HttpSession session = request.getSession();
        	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
        	RoleBean roleBeanRet=roleInfoService.beforeUpdateRole(loginBean,roleBean.getRoleId());
            resultInfo.setData(roleBeanRet);
           
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
    
    
    @RequestMapping("/checkCanRemoveRole")
    @ResponseBody
    private ResultInfo checkCanRemoveRole(HttpServletRequest request,RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	 HttpSession session = request.getSession();
        	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
        	roleInfoService.checkCanRemoveRole(roleBean,loginBean);
            resultInfo.setData(roleBean.getAuthIds());
           
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
    @RequestMapping("/isExitRoleByCreator")
    @ResponseBody
    public ResultInfo isExitRoleByCreator(RoleBean roleBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	
        	roleInfoService.findIsExitRoleByCreator(roleBean.getRoleCreator());
        	resultInfo.setData(roleBean.getRoleCreator());
           
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
    
}
