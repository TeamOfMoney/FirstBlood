package com.nantian.nfcm.bms.auth.web;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.nantian.nfcm.bms.auth.service.MenuService;
import com.nantian.nfcm.bms.auth.vo.MenuTreeNode;
import com.nantian.nfcm.util.vo.LoginBean;
import com.nantian.nfcm.util.vo.ResultInfo;

@Controller
@RequestMapping(value = "/menu")
public class MenuConstroller {
    private static Logger log = Logger.getLogger(MenuConstroller.class.getName());
    @Autowired
    private MenuService menuService;


    @RequestMapping("/menuTreeByUser")
    @ResponseBody
    public ResultInfo menuTreeByUser(HttpServletRequest request) {///
        ResultInfo resultInfo = new ResultInfo();
        try {
            LoginBean loginBean = (LoginBean) request.getSession().getAttribute("loginInfo");
            log.debug("查询获取用户[" + loginBean.getUserName() + "]的功能菜单树");
            resultInfo.setData(menuService.getMenuTree(loginBean.getMenuTrees()));
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/queryMenuTreeAll")
    @ResponseBody
    public ResultInfo queryMenuTreeAll(HttpServletRequest request) {
        ResultInfo resultInfo = new ResultInfo();
        try {
            LoginBean loginBean = (LoginBean) request.getSession().getAttribute("loginInfo");
            log.debug("查询获取用户[" + loginBean.getUserName() + "]的功能菜单树");
            resultInfo.setData(menuService.getMenuTreeAll());
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/findMenuById")
    @ResponseBody
    public ResultInfo findMenuById(MenuTreeNode menuTreeNode) {
        ResultInfo resultInfo = new ResultInfo();
        try {
            MenuTreeNode menuTreeNodeRet = menuService.findMenuById(menuTreeNode.getId());
            resultInfo.setData(menuTreeNodeRet);
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/addMenu")
    @ResponseBody
    public ResultInfo addMenu(MenuTreeNode menuTreeNode) {
        ResultInfo resultInfo = new ResultInfo();
        try {
            MenuTreeNode menuTreeNodeRet = menuService.addMenu(menuTreeNode);
            resultInfo.setData(menuTreeNodeRet);
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping(value = "/updateMenu", method = RequestMethod.POST)
    @ResponseBody
    public ResultInfo updateMenu(MenuTreeNode menuTreeNode) {
        ResultInfo resultInfo = new ResultInfo();
        try {
            MenuTreeNode menuTreeNodeRet = menuService.updateMenu(menuTreeNode);
            resultInfo.setData(menuTreeNodeRet);
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;

    }

    @RequestMapping("/removeMenu")
    @ResponseBody
    public ResultInfo removeMenu(MenuTreeNode menuTreeNode) {
        ResultInfo resultInfo = new ResultInfo();
        try {
            menuService.removeMenu(menuTreeNode);
            resultInfo.setData(menuTreeNode);
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

}
