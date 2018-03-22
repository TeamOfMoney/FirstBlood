package com.nantian.nfcm.util.web;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nantian.nfcm.util.entity.Param;
import com.nantian.nfcm.util.service.ParamService;
import com.nantian.nfcm.util.vo.ParamBean;
import com.nantian.nfcm.util.vo.ResultInfo;


@RequestMapping(value = "/param")
@Controller
public class ParamConstroller
{
	private static Logger log = Logger.getLogger(ParamConstroller.class.getName());
	
	@Autowired
	private ParamService paramService;
	
	@RequestMapping("/findParam")
	@ResponseBody
	public ResultInfo findParam(int page, int size, Param param)
	{
		ResultInfo resultInfo = new ResultInfo();
		try {
            Page<Param> pages = paramService.findParam(page, size);
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
	
	@RequestMapping("/addParam")
	@ResponseBody
	public ResultInfo addParam(Param param)
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			Param paramRet = paramService.addParam(param);
			resultInfo.setData(paramRet);
			resultInfo.setSuccess("true");
		} 
		catch (Exception e) {
			log.error(e.getMessage());
			resultInfo.setSuccess("false");
			resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
	
	@RequestMapping("/findParamById")
	@ResponseBody
	public ResultInfo findParamById(Param param)
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			Param paramRet =paramService.findParamById(param.getParamName());
			resultInfo.setData(paramRet);
			resultInfo.setSuccess("true");
		} 
		catch (Exception e) {
			log.error(e.getMessage());
			resultInfo.setSuccess("false");
			resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
	
	@RequestMapping("/updateParam")
	@ResponseBody
	public ResultInfo updateParam(Param param)
	{
		ResultInfo resultInfo = new ResultInfo();
		try
		{
			Param paramRet=paramService.updateParam(param);
			resultInfo.setData(paramRet);
			resultInfo.setSuccess("true");
		} 
		catch (Exception e) {
			log.error(e.getMessage());
			resultInfo.setSuccess("false");
			resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
	
	@RequestMapping("/removeParam")
	@ResponseBody
	public ResultInfo removeParam(Param param)
	{
		ResultInfo resultInfo=new ResultInfo();
		try
		{
			paramService.removeParam(param.getParamName());
			resultInfo.setData(param);
			resultInfo.setSuccess("true");
		} 
		catch (Exception e) {
			log.error(e.getMessage());
			resultInfo.setSuccess("false");
			resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
	
	@RequestMapping("/removeParams")
	@ResponseBody
	public ResultInfo removeParams(ParamBean paramBean)
	{
		ResultInfo resultInfo=new ResultInfo();
		try
		{
			paramService.removeParams(paramBean.getParamNames());
			resultInfo.setData(paramBean);
			resultInfo.setSuccess("true");
		} 
		catch (Exception e) {
			log.error(e.getMessage());
			resultInfo.setSuccess("false");
			resultInfo.setData(e.getMessage());
		}
		return resultInfo;
	}
}
