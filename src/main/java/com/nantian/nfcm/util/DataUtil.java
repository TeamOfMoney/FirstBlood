package com.nantian.nfcm.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import sun.misc.BASE64Encoder;

public class DataUtil
{
	/**
	 * 截取double数字，只保留小数点后两位
	 * 
	 * @param num
	 *            数字
	 * @return 截取后的数字
	 */
	public static double interceptDouble(double num)
	{
		num = num * 100;
		int temp = (int) num;
		num = (double) temp / 100;
		return num;
	}

	/**
	 * 生成文件MD5
	 * 
	 * @param file
	 * @return MD5
	 * @throws Exception
	 */
	public static String digestFile(File file) throws Exception
	{
		String digest = null;
		byte array[] = new byte[1024];
		if (file == null || !file.exists())
		{
			throw new Exception();
		}
		MessageDigest md = MessageDigest.getInstance("MD5");
		BufferedInputStream in = new BufferedInputStream(new FileInputStream(
				file));
		int len = 0;
		while ((len = in.read(array, 0, 1024)) > 0)
		{
			md.update(array, 0, len);
		}
		byte[] theDigest;
		theDigest = md.digest();
		digest = (new BASE64Encoder().encode(theDigest));
		in.close();
		return digest;
	}

	public static String digestFileNoBase64(File file) throws Exception
	{
		if (!file.isFile())
		{
			return null;
		}
		MessageDigest digest = null;
		FileInputStream in = null;
		byte buffer[] = new byte[1024];
		int len;
		try
		{
			digest = MessageDigest.getInstance("MD5");
			in = new FileInputStream(file);
			while ((len = in.read(buffer, 0, 1024)) != -1)
			{
				digest.update(buffer, 0, len);
			}
			in.close();
		}
		catch (Exception e)
		{
			e.printStackTrace();
			return null;
		}
		BigInteger bigInt = new BigInteger(1, digest.digest());
		return bigInt.toString(16);
	}

	/**
	 * 删除一个文件并把它文件夹（如果为空）删除
	 * 
	 * @param file
	 * @return
	 */
	public static void deleteFileAndParentFolder(File file)
	{
		if (file.exists())
		{
			file.delete();
		}
		File dir = new File(file.getParent());
		// 当文件夹存在并且确定是文件夹并且该文件夹下无任何东西
		if (dir.exists() && dir.isDirectory() && dir.list().length == 0)
		{
			deleteFileAndParentFolder(dir);
		}
	}

	/**
	 * 删除一个文件或文件夹（包括文件夹下的文件）
	 * 
	 * @param file
	 * @return
	 */
	public static void deleteFileOrFolder(File file)
	{
		if (file.exists())
		{
			if (file.isDirectory())
			{
				File[] childrenFiles = file.listFiles();
				for (int i = 0; i < childrenFiles.length; i++)
				{
					deleteFileOrFolder(childrenFiles[i]);
				}
			}
			file.delete();
		}
	}

	/**
	 * 取得当前时间，以yyyy-MM-dd HH:mm:ss样式的字符串返回
	 * 
	 * @return
	 */
	public static String getStringDate()
	{
		SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return f.format(new Date());
	}

	
	/**
	 * 根据报文头判定报文是否发送完整
	 * @param str
	 * @param direction
	 * @return
	 */
	public static int strContrast(byte[] data, String direction) throws NumberFormatException
	{
		int head = 0;
		if(data.length == 8){
			String header = new String(data);
			head = Integer.parseInt(header);
		}
		return head;
	}
	
	
	/**
	 * 删除一个文件夹下的文件
	 * 
	 * @param file
	 * @return
	 */
	public static void deleteFiles(File file)
	{
		if (file.exists())
		{
			if (file.isDirectory())
			{
				File[] childrenFiles = file.listFiles();
				for (int i = 0; i < childrenFiles.length; i++)
				{
					deleteFileOrFolder(childrenFiles[i]);
				}
			}
		}
	}
	
	public static String addZeroForNum(String str,int strLength) {  
		  int strLen =str.length();  
		  if (strLen <strLength) {  
		   while (strLen< strLength) {  
		    StringBuffer sb = new StringBuffer();  
		    sb.append("0").append(str);//左补0  
//		    sb.append(str).append("0");//右补0  
		    str= sb.toString();  
		    strLen= str.length();  
		   }  
		  }  

		  return str;  
		 }
}
