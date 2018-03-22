package com.nantian.nfcm.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtil
{
	/**
	 * 依据时间格式获取当前时间字符串
	 * @param timeFormatStr 时间格式串，譬如："yyyy-MM-dd HH:mm:ss"
	 * @return String 当前时间字符串
	 */
	public static String getCurrentTime(String timeFormatStr)
	{
		SimpleDateFormat timeFormat = new SimpleDateFormat(timeFormatStr);
		Date currentTime = new Date();
		return timeFormat.format(currentTime);
	}
	
	/**
	 * 依据时间格式获取期望时间字符串
	 * @param timeFormatStr 时间格式串，譬如："yyyy-MM-dd HH:mm:ss"
	 * @param field 时间调整域
	 * @param amount 调整值
	 * @return String 期望时间字符串
	 */
	public static String getExpectTime(String timeFormatStr,int field,int amount)
	{
		SimpleDateFormat timeFormat = new SimpleDateFormat(timeFormatStr);
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(new Date());
		gc.add(field, amount);
		return timeFormat.format(gc.getTime());
	}
	
	/**
	 * 格式化时间
	 * yyyymmddHHMMSS change to yyyy-mm-dd HH:mm:ss
	 * @param dateStr
	 * @return
	 * @throws Exception
	 */
	public static String getFormatTime(String dateStr) throws Exception
	{
		try
		{
			String year = dateStr.substring(0, 4);
			String month = dateStr.substring(4, 6);
			String day = dateStr.substring(6, 8);
			
			String hours = dateStr.substring(8, 10);
			String minute = dateStr.substring(10, 12);
			String second = dateStr.substring(12, 14);
			
			return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
		}
		catch (Exception e)
		{
			throw new Exception("格式化日期出错",e);
		}
	}
}
