package com.nantian.nfcm.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;

import sun.misc.BASE64Encoder;

public class BaseUtil
{
	public static String getMD5Encode(String inStr)
	{
		String encodeRet = null;
		try
		{
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			messageDigest.update(inStr.getBytes());
			encodeRet = (new BASE64Encoder().encode(messageDigest.digest()));
		}
		catch (Exception e)
		{
		}
		return encodeRet;
	}

	public static String getMD5Encode(File file)
	{
		String encodeRet = null;
		InputStream fis = null;
		if (file != null && file.exists())
		{
			try
			{
				fis = new FileInputStream(file);
			}
			catch (FileNotFoundException e)
			{
				e.printStackTrace();
			}
		}
		byte[] buffer = new byte[1024];
		int numRead = 0;
		try
		{
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			while ((numRead = fis.read(buffer)) > 0)
			{
				messageDigest.update(buffer, 0, numRead);
			}
			encodeRet = (new BASE64Encoder().encode(messageDigest.digest()));
		}
		catch (Exception e)
		{
			try
			{
				fis.close();
			}
			catch (IOException e1)
			{
				e1.printStackTrace();
			}
		}
		return encodeRet;
	}
}