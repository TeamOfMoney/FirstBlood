package com.nantian.nfcm.util.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.entity.Param;

public interface ParamService
{
	/**
	 * 根据条件查询参数信息
	 * 
	 * @param start 起始记录数
	 * @param limit 最大记录数
	 * @return Page<Param>
	 * @throws ServiceException
	 */
	public Page<Param> findParam(int page, int size) throws ServiceException;

	/**
	 * 添加参数信息
	 * 
	 * @param param 参数信息
	 * @return 参数信息
	 * @throws ServiceException
	 */
	public Param addParam(Param param) throws ServiceException;

	/**
	 * 查询特定参数信息
	 * 
	 * @param paramName 参数名称
	 * @return
	 * @throws ServiceException
	 */
	public Param findParamById(String paramName) throws ServiceException;

	/**
	 * 更新参数信息
	 * 
	 * @param paramIn 参数信息
	 * @return 参数信息
	 * @throws ServiceException
	 */
	public Param updateParam(Param param) throws ServiceException;

	/**
	 * 删除参数信息
	 * 
	 * @param paramName 参数名称
	 * @throws ServiceException
	 */
	public void removeParam(String paramName) throws ServiceException;
	
	/**
	 * 批量删除参数信息
	 * 
	 * @param baseParamName 参数名称
	 * @throws ServiceException
	 */
	public void removeParams(List<String> paramNames) throws ServiceException;
}
