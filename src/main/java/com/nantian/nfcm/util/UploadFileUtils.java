package com.nantian.nfcm.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class UploadFileUtils {
    /**
     * 将上传的图片保存到本地f盘的工具类。
     *  原名称
     * @param request 请求
     * @param file 文件
     * @param
     * @return 完整文件路径
     */
    public static String uploadFile(MultipartHttpServletRequest request, MultipartFile file,String rootUrl) {
        //String rootUrl="D"+"://"+"pictureurl/";//根目录，
        //上传
        try {
            
            if(file!=null){
                String origName=file.getOriginalFilename();// 文件原名称
                System.out.println("上传的文件原名称:"+origName);
                        //存放图片文件的路径
                        String fileSrc="";
                        try{
                        	File uploadPath = new File(rootUrl);
                        	if(!uploadPath.exists())
                        	{
                        		uploadPath.mkdirs();
                        	}
                            File uploadedFile = new File(rootUrl+"//"+origName);
                            System.out.println("upload==="+rootUrl);
                            OutputStream os = new FileOutputStream(uploadedFile);
                            InputStream is =file.getInputStream();
                            byte buf[] = new byte[1024];//可以修改 1024 以提高读取速度
                            int length = 0;
                            while( (length = is.read(buf)) > 0 ){
                                os.write(buf, 0, length);
                            }
                            //关闭流
                            os.flush();
                            is.close();
                            os.close();
                            fileSrc=origName+"#";
                            //fileSrc=rootUrl+"/"+origName+"#";
                            //fileSrc="../upload/image/"+origName+"#";
                            System.out.println("保存成功！路径："+rootUrl+"/"+origName);
                        }catch(Exception e){
                            e.printStackTrace();
                        }
                        return fileSrc;
                    }
            return null;
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    /*public static String uploadFile(String actionUrl, String[] uploadFilePaths) {
    	  String end = "\r\n";
    	  String twoHyphens = "--";
    	  String boundary = "*****";

    	  DataOutputStream ds = null;
    	  InputStream inputStream = null;
    	  InputStreamReader inputStreamReader = null;
    	  BufferedReader reader = null;
    	  StringBuffer resultBuffer = new StringBuffer();
    	  String tempLine = null;

    	  try {
    	   // 统一资源
    	   URL url = new URL(actionUrl);
    	   // 连接类的父类，抽象类
    	   URLConnection urlConnection = url.openConnection();
    	   // http的连接类
    	   HttpURLConnection httpURLConnection = (HttpURLConnection) urlConnection;

    	   // 设置是否从httpUrlConnection读入，默认情况下是true;
    	   httpURLConnection.setDoInput(true);
    	   // 设置是否向httpUrlConnection输出
    	   httpURLConnection.setDoOutput(true);
    	   // Post 请求不能使用缓存
    	   httpURLConnection.setUseCaches(false);
    	   // 设定请求的方法，默认是GET
    	   httpURLConnection.setRequestMethod("POST");
    	   // 设置字符编码连接参数
    	   httpURLConnection.setRequestProperty("Connection", "Keep-Alive");
    	   // 设置字符编码
    	   httpURLConnection.setRequestProperty("Charset", "UTF-8");
    	   // 设置请求内容类型
    	   httpURLConnection.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + boundary);

    	   // 设置DataOutputStream
    	   ds = new DataOutputStream(httpURLConnection.getOutputStream());
    	   for (int i = 0; i < uploadFilePaths.length; i++) {
    	    String uploadFile = uploadFilePaths[i];
    	    String filename = uploadFile.substring(uploadFile.lastIndexOf("//") + 1);
    	    ds.writeBytes(twoHyphens + boundary + end);
    	    ds.writeBytes("Content-Disposition: form-data; " + "name=\"file" + i + "\";filename=\"" + filename
    	      + "\"" + end);
    	    ds.writeBytes(end);
    	    FileInputStream fStream = new FileInputStream(uploadFile);
    	    int bufferSize = 1024;
    	    byte[] buffer = new byte[bufferSize];
    	    int length = -1;
    	    while ((length = fStream.read(buffer)) != -1) {
    	     ds.write(buffer, 0, length);
    	    }
    	    ds.writeBytes(end);
    	     close streams 
    	    fStream.close();
    	   }
    	   ds.writeBytes(twoHyphens + boundary + twoHyphens + end);
    	    close streams 
    	   ds.flush();
    	   if (httpURLConnection.getResponseCode() >= 300) {
    	    throw new Exception(
    	      "HTTP Request is not success, Response code is " + httpURLConnection.getResponseCode());
    	   }

    	   if (httpURLConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
    	    inputStream = httpURLConnection.getInputStream();
    	    inputStreamReader = new InputStreamReader(inputStream);
    	    reader = new BufferedReader(inputStreamReader);
    	    tempLine = null;
    	    resultBuffer = new StringBuffer();
    	    while ((tempLine = reader.readLine()) != null) {
    	     resultBuffer.append(tempLine);
    	     resultBuffer.append("\n");
    	    }
    	   }

    	  } catch (Exception e) {
    	   // TODO Auto-generated catch block
    	   e.printStackTrace();
    	  } finally {
    	   if (ds != null) {
    	    try {
    	     ds.close();
    	    } catch (IOException e) {
    	     // TODO Auto-generated catch block
    	     e.printStackTrace();
    	    }
    	   }
    	   if (reader != null) {
    	    try {
    	     reader.close();
    	    } catch (IOException e) {
    	     // TODO Auto-generated catch block
    	     e.printStackTrace();
    	    }
    	   }
    	   if (inputStreamReader != null) {
    	    try {
    	     inputStreamReader.close();
    	    } catch (IOException e) {
    	     // TODO Auto-generated catch block
    	     e.printStackTrace();
    	    }
    	   }
    	   if (inputStream != null) {
    	    try {
    	     inputStream.close();
    	    } catch (IOException e) {
    	     // TODO Auto-generated catch block
    	     e.printStackTrace();
    	    }
    	   }

    	   return resultBuffer.toString();
    	  }
    	 }*/

}