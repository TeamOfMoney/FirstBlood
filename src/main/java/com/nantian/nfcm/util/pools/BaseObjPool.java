package com.nantian.nfcm.util.pools;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextException;

public final class BaseObjPool
{
	public static int APPLICATION_NORMAL=0;
	public static int APPLICATION_DATAINIT=1;
	public static int APPLICATION_PAUSE=2;
	public static int APPLICATION_STOP=3;
	private static final BaseObjPool baseObjPool = new BaseObjPool();
	private ApplicationContext applicationContext;
	private int applicationStatus=APPLICATION_DATAINIT;
	private Map<String,Object> baseObjMap = new HashMap<String,Object>();
	
	private BaseObjPool()
	{
	}
  
	public static Object getObj(String objName)
	{
		return baseObjPool.baseObjMap.get(objName);
	}
	
	public static void registObj(String objName,Object obj)
	{
		baseObjPool.baseObjMap.put(objName,obj);
	}
	
	public static void unRegistObj(String objName)
	{
		baseObjPool.baseObjMap.remove(objName);
	}

	public static void registApplicationContext(ApplicationContext applicationContext)
	{
		baseObjPool.applicationContext = applicationContext;
	}
	
	public static void setApplicationStatus(int applicationStatus)
	{
		if(applicationStatus>=APPLICATION_NORMAL && applicationStatus<=APPLICATION_STOP && (!(applicationStatus==APPLICATION_PAUSE && baseObjPool.applicationStatus!=APPLICATION_NORMAL)))
		{
			baseObjPool.applicationStatus = applicationStatus;
		}
	}
	
	public static int getApplicationStatus()
	{
		return baseObjPool.applicationStatus;
	}
	
	public static Object getBean(String name) throws BeansException
	{
		if(baseObjPool.applicationContext!=null)
		{
			return baseObjPool.applicationContext.getBean(name);
		}
		else
		{
			throw new ApplicationContextException("applicationContext not initialize");
		}
	}

}
