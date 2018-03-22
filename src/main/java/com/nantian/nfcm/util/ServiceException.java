package com.nantian.nfcm.util;

public class ServiceException extends Exception
{
	private static final long serialVersionUID = -7156489396935487005L;
	private String[] argv=null;
	public ServiceException(String exceptionStr)
	{
		super(exceptionStr);
	}
	public ServiceException(String exceptionStr,String[] argv)
	{
		super(exceptionStr);
		this.argv=argv;
	}
	public String[] getArgv()
	{
		return argv;
	}
	public void setArgv(String[] argv)
	{
		this.argv = argv;
	}
	/*public String findMessageTextCN()
	{
		String messageTextCN = LocalizedTextUtil.findDefaultText(getMessage(), Locale.SIMPLIFIED_CHINESE, argv);
		if(messageTextCN == null)
		{
			messageTextCN = getMessage();
		}
		return messageTextCN;
	}*/
}
