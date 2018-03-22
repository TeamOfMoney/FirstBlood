package com.nantian.nfcm.util.web;

import com.nantian.nfcm.util.BaseConst;
import com.nantian.nfcm.util.pools.BaseObjPool;
import com.nantian.nfcm.util.vo.LoginBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;

public class BaseInterceptor implements HandlerInterceptor {
    private static Logger log = LoggerFactory.getLogger(BaseInterceptor.class);
    //权限正确
    private static final int FORWARD_CONTINUE = 0;
    //服务器不可用状态
    private static final int APPLICATION_DISABLE = 4;
    //拒绝登录
    private static final int LOGIN_REDIRECT = 3;
    //session过期
    private static final int SESSION_INVALID = 2;
    //权限拒绝
    private static final int AUTHORITY_REFUSE = 1;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object arg2) throws Exception {
        log.debug("=========进入拦截器=========");
        int forwardFlag = FORWARD_CONTINUE;
        HttpSession session = request.getSession();
        LoginBean loginBean = (LoginBean) session.getAttribute("loginInfo");
        String requestType = request.getHeader("X-Requested-With");//识别ajax的响应头  
        String ctxPath = request.getContextPath();  
        String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ ctxPath; 
        String uri = getUri(request);
        log.debug("URI is ：" + uri);
        if (BaseObjPool.getApplicationStatus() == BaseObjPool.APPLICATION_NORMAL) {
            log.debug("服务状态正常");
            if (loginBean != null) {
                Map<Long, String> userAuthIds = loginBean.getUserAuthIds();
                if (userAuthIds != null && userAuthIds.size() > 0) {
                    forwardFlag = AUTHORITY_REFUSE;
                    if (userAuthIds.containsValue(uri) || uri.equals("/menu/menuTreeByUser.action")||uri.equals("/login/getLoginUserInfo.action")||uri.equals("/user/updateUserSelfPassword.action")) {
                        forwardFlag = FORWARD_CONTINUE;
                        log.debug("FORWARDFLAG IS：FORWARD_CONTINUE");
                    }
                }
            } else if (uri != null && uri.endsWith(".action")) {
                forwardFlag = SESSION_INVALID;
            } else {
                forwardFlag = LOGIN_REDIRECT;
            }
        } else {
            forwardFlag = APPLICATION_DISABLE;
        }
        switch (forwardFlag) {
            case AUTHORITY_REFUSE:
                log.debug("FORWARDFLAG IS：AUTHORITY_REFUSE");
                response.setStatus(BaseConst.RESPONSE_ERR);
                response.setContentType("text/html;charset=utf-8");
                response.setCharacterEncoding("utf-8");
                response.getWriter().write("对不起，您没有该功能的操作权限，请与管理员联系");
                break;
            case SESSION_INVALID:
                log.debug("FORWARDFLAG IS：SESSION_INVALID");
                response.setStatus(BaseConst.SESSION_INVALID_ERR);
                response.setContentType("text/html;charset=utf-8");
                response.setCharacterEncoding("utf-8");
                response.getWriter().write("会话过期或尚未登录，请重新登录");
                request.setAttribute("errMsg", "会话过期或尚未登录，请重新登录");
                if (requestType != null && requestType.equals("XMLHttpRequest")) {
                	// 处理ajax请求  
                   response.setHeader("REDIRECT", "REDIRECT");//告诉ajax这是重定向  
                   response.setHeader("CONTEXTPATH", basePath+"/login");//重定向地址  
                   
    			}else{
    				response.sendRedirect("../login");
    			}
               
               
                break;
            case APPLICATION_DISABLE:
                log.debug("FORWARDFLAG IS：APPLICATION_DISABLE");
                response.setStatus(BaseConst.RESPONSE_ERR);
                response.setContentType("text/html;charset=utf-8");
                response.setCharacterEncoding("utf-8");
                response.getWriter().write("服务暂停，请与应用管理员联系");
                break;
            case LOGIN_REDIRECT:
                log.debug("FORWARDFLAG IS：LOGIN_REDIRECT");
                RequestDispatcher dispatcher = request.getRequestDispatcher("../login");
                request.setAttribute("errMsg", "登录拒绝");
                dispatcher.forward(request, response);
                break;
            default:
                response.setHeader("Access-Control-Allow-Origin", "*");
                return true;
        }
        return false;
    }

    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1,
                                Object arg2, Exception arg3) throws Exception {
        // TODO Auto-generated method stub
    }

    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
                           Object arg2, ModelAndView arg3) throws Exception {
        // TODO Auto-generated method stub
    }

    /**
     * 从Http请求中获取uri
     *
     * @param request Http请求
     * @return uri
     */
    private String getUri(HttpServletRequest request) {
        String uri = (String) request.getAttribute("javax.servlet.include.servlet_path");
        if (uri != null) {
            return uri;
        }
        uri = getServletPath(request);
        if (uri != null && !"".equals(uri)) {
            return uri;
        }
        uri = request.getRequestURI();
        return uri.substring(request.getContextPath().length());
    }

    /**
     * 依据servlet(2.2 vs 2.3+)规范进行不同的处理，获取当前请求的servlet路径
     *
     * @param request 当前请求
     * @return servlet路径
     */
    private String getServletPath(HttpServletRequest request) {
        String servletPath = request.getServletPath();

        String requestUri = request.getRequestURI();
        if (requestUri != null && servletPath != null
                && !requestUri.endsWith(servletPath)) {
            int pos = requestUri.indexOf(servletPath);
            if (pos > -1) {
                servletPath = requestUri.substring(requestUri.indexOf(servletPath));
            }
        }
        if (null != servletPath && !"".equals(servletPath)) {
            return servletPath;
        }
        int startIndex = request.getContextPath().equals("") ? 0 : request
                .getContextPath().length();
        int endIndex = request.getPathInfo() == null ? requestUri.length()
                : requestUri.lastIndexOf(request.getPathInfo());
        if (startIndex > endIndex) {
            endIndex = startIndex;
        }
        return requestUri.substring(startIndex, endIndex);
    }
}
