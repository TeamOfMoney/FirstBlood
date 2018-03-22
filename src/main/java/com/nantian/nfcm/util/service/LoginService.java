package com.nantian.nfcm.util.service;


import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.vo.LoginBean;

public interface LoginService {
	/**
	 * 用户登录：1、判断用户是否存在；2、密码是否匹配；3、用户权限载入
	 * @param loginBean 用户登录名,密码,远程机IP地址
	 * @return
	 * @throws ServiceException
	 */
	public void saveLogin(LoginBean loginBean) throws ServiceException;
	/**
	 * 登出
	 * @param loginBean
	 * @throws ServiceException
	 */
	public void removeLogin(LoginBean loginBean) throws ServiceException;
}
