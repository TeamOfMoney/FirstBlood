package com.nantian.nfcm.util.web;

import com.nantian.nfcm.bms.auth.vo.UserBean;
import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.service.LoginService;
import com.nantian.nfcm.util.vo.LoginBean;
import com.nantian.nfcm.util.vo.ResultInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RequestMapping("/")
@Controller
public class LoginController {
    private static Logger log = LoggerFactory.getLogger(LoginController.class);
    private LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @RequestMapping("/login.action")
    @ResponseBody
    private ResultInfo login(HttpServletRequest request, UserBean userBean) {
        ResultInfo resultInfo = new ResultInfo();
        try {
            LoginBean login = new LoginBean();
            login.setUserName(userBean.getUserName());
            login.setPwd(userBean.getPwd());
            login.setClientIP(request.getRemoteAddr());
            loginService.saveLogin(login);
            HttpSession session = request.getSession();
            session.setAttribute("loginInfo", login);
            resultInfo.setSuccess("true");
        } catch (ServiceException e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
    
    @RequestMapping("/logOut.action")
	@ResponseBody
	public ResultInfo logOut(HttpServletRequest request)
	{
		 ResultInfo resultInfo=new ResultInfo();
		request.getSession().invalidate();
		resultInfo.setSuccess("true");
		return resultInfo;
	}
    
    @RequestMapping("/login/getLoginUserInfo.action")
   	@ResponseBody
   	public ResultInfo getLoginUserInfo(HttpServletRequest request)
   	{
   		 ResultInfo resultInfo=new ResultInfo();
   		LoginBean loginBean= (LoginBean)request.getSession().getAttribute("loginInfo");
   		resultInfo.setData(loginBean);
   		resultInfo.setSuccess("true");
   		return resultInfo;
   	}
    
    @RequestMapping("/logOff")
	public String logOff(HttpServletRequest request)
	{
		request.getSession().invalidate();
		return "../login";
	}
}
