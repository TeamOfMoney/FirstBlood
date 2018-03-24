package com.nantian.nfcm.bms.auth.web;

import com.nantian.nfcm.bms.auth.entity.UserInfo;
import com.nantian.nfcm.bms.auth.service.UserInfoService;
import com.nantian.nfcm.bms.auth.vo.UserBean;
import com.nantian.nfcm.util.vo.GridData;
import com.nantian.nfcm.util.vo.LoginBean;
import com.nantian.nfcm.util.vo.ResultInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserInfoController {
    private static Logger log = LoggerFactory.getLogger(UserInfoController.class);
    private UserInfoService userInfoService;

    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    @RequestMapping("/findById")
    @ResponseBody
    private ResultInfo findById(HttpServletRequest request,UserBean userBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            String userName = userBean.getUserName();
            HttpSession session = request.getSession();
        	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
            UserBean userBeanRet = userInfoService.findByUserName(userName,loginBean);
            resultInfo.setSuccess("true");
            resultInfo.setData(userBeanRet);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/findByCondition")
    @ResponseBody
    private ResultInfo findByCondition(HttpServletRequest request,int page, int size, UserBean userBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	 HttpSession session = request.getSession();
         	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
        	//LoginBean loginBean=(LoginBean)session.get("loginInfo");
            GridData<UserBean> gd= userInfoService.findByCondition(page, size, userBean,loginBean);
            resultInfo.setData(gd.getData());
            resultInfo.setNumber(gd.getNumber());
            resultInfo.setPage(gd.getPage());
            resultInfo.setTotalPage(gd.getTotalPage());
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/addUser")
    @ResponseBody
    private ResultInfo addUser(HttpServletRequest request,UserBean userBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	HttpSession session = request.getSession();
         	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
            UserInfo userInfo = userInfoService.addUserInfo(userBean,loginBean);
            resultInfo.setSuccess("true");
            resultInfo.setData(userInfo);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/updateUser")
    @ResponseBody
    private ResultInfo updateUser(HttpServletRequest request,UserBean userBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	HttpSession session = request.getSession();
         	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
            UserBean userBeanRet = userInfoService.updateUserInfo(userBean,loginBean);
            resultInfo.setSuccess("true");
            resultInfo.setData(userBeanRet);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/delUser")
    @ResponseBody
    private ResultInfo delUser(HttpServletRequest request,UserBean userBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	HttpSession session = request.getSession();
         	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
            userInfoService.delUserInfo(userBean,loginBean);
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
    
    
    @RequestMapping("/resetPassword")
    @ResponseBody
    private ResultInfo resetPassword(HttpServletRequest request,UserBean userBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
        	HttpSession session = request.getSession();
         	LoginBean loginBean=(LoginBean)session.getAttribute("loginInfo");
         	UserBean userBeanRet = userInfoService.resetUserPwd(userBean,loginBean);
            resultInfo.setSuccess("true");
            resultInfo.setData(userBeanRet);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
    
    @RequestMapping("/updateUserSelfPassword")
    @ResponseBody
	public ResultInfo updateUserSelfPassword(HttpServletRequest request,UserBean userBean)throws Exception
	{
    	ResultInfo resultInfo=new ResultInfo();
		try
		{
			LoginBean loginBean=(LoginBean)request.getSession().getAttribute("loginInfo");
			UserBean userBeanRet=userInfoService.updateUserSelf(userBean,loginBean.getUserName());
			resultInfo.setSuccess("true");
			resultInfo.setData(userBeanRet);
		}
		catch(Exception e)
		{
			 log.error(e.getMessage());
	         resultInfo.setSuccess("false");
	         resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
    
    /**
     * 删除厂商信息
     * @param firmInfo
     * @return ResultInfo
     * @throws Exception
     */
    @RequestMapping("/queryReviewUserOptions")
    @ResponseBody
    private ResultInfo queryReviewUserOptions() throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            List reviewUserList= userInfoService.queryReviewUserOptions();
        	/*UserBean userBean =new UserBean();
        	userBean.setUserType("3");
            GridData<UserBean> gd= userInfoService.findByCondition(0, 0, userBean,null);*/
            resultInfo.setSuccess("true");
            resultInfo.setData(reviewUserList);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
}
