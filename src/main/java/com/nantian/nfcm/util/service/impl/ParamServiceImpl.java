package com.nantian.nfcm.util.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.dao.ParamDao;
import com.nantian.nfcm.util.entity.Param;
import com.nantian.nfcm.util.service.ParamService;


@Service
public class ParamServiceImpl implements ParamService
{
	@Autowired
	private ParamDao paramDao;
	
	/**
	 * 根据条件查询参数信息
	 * 
	 * @param start 起始记录数
	 * @param limit 最大记录数
	 * @return Page<Param>
	 * @throws ServiceException
	 */
	public Page<Param> findParam(int page, int size) throws ServiceException
	{
		Pageable pageable = new PageRequest(page, size, Sort.Direction.ASC, "paramName");
        return paramDao.findAll(pageable);
	}
	
	/**
	  * 添加参数信息 
	  * @param Param 参数信息
	  * @return Param 参数信息
	  * @throws ServiceException
	  */
	public Param addParam(Param paramIn) throws ServiceException
	{
		Param param=paramDao.findOne(paramIn.getParamName());
		if(param!=null)
		{
			throw new ServiceException("系统参数信息已存在[添加失败]");
		}
		paramDao.save(paramIn);
		return paramIn;
	}
	
	/**
	 * 查询特定参数信息
	 * 
	 * @param ParamName 参数名称
	 * @return Param
	 * @throws ServiceException
	 */
	public Param findParamById(String paramName) throws ServiceException
	{
		Param param = new Param(); 
		if(paramName !=null )
		{  
			param = paramDao.findOne(paramName);
		  if(param ==null)
		  {
		  	 throw new ServiceException("查找的系统参数不存在[查询失败]");
		  }
		}
		return param;
	}

	/**
	 * 更新参数信息
	 * 
	 * @param ParamIn 参数信息
	 * @return Param 参数信息
	 * @throws ServiceException
	 */
	public Param updateParam(Param paramIn)	throws ServiceException{ 
		Param param = null;
		if (paramIn != null && paramIn.getParamValue() != null)
		{
			param = paramDao.findOne(paramIn.getParamName());
			if (param != null)
			{
				param.setParamValue(paramIn.getParamValue());
				param.setParamDesc(paramIn.getParamDesc());
				paramDao.save(param);
			}else{
				throw new ServiceException("系统参数信息为空[更新失败]");
			}
		}
		return param;
	}

	/**
	 * 删除参数信息
	 * 
	 * @param ParamName 参数名称
	 * @throws ServiceException
	 */
	public void removeParam(String paramName) throws ServiceException
	{
		
		if(paramName!=null){
			Param param=paramDao.findOne(paramName);
			if(param!=null){
				paramDao.delete(param);
			}else{
				throw new ServiceException("系统参数信息为空[删除失败]");
			}
		}else{
			throw new ServiceException("参数名称为空[删除失败]");
		}
	}
	
	/**
	 * 删除参数信息
	 * 
	 * @param ParamName 参数名称
	 * @throws ServiceException
	 */
	public void removeParams(List<String> paramNames) throws ServiceException
	{
		
		if(paramNames.size()>0){
			for(String paramName:paramNames)
			{
				Param param=paramDao.findOne(paramName);
				if(param!=null){
					paramDao.delete(param);
				}else{
					throw new ServiceException("系统参数信息为空[删除失败]");
				}
			}
			
		}else{
			throw new ServiceException("参数列表为空[删除失败]");
		}
	}

}
