package com.nantian.nfcm;

import com.nantian.nfcm.util.annotation.ResultFilter;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice(basePackages = "com.nantian.nfcm.app.web")
public class NfcmResponseBodyAdvice implements ResponseBodyAdvice {
    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if (body == null) {
            return null;
        }
        if (returnType.getMethod().isAnnotationPresent(ResultFilter.class)) {
            ResultFilter resultFilter = returnType.getMethodAnnotation(ResultFilter.class);
            String[] excludes = resultFilter.excludes();

            if (excludes.length == 0) {
                return body;
            } else {
                return handleResultInfo(body, excludes);
            }
        } else {
            return body;
        }
    }

    /**
     * 处理返回ResultInfo对象
     *
     * @param obj (ResultInfo)
     * @return Object(Map)
     */
    private Object handleResultInfo(Object obj, String[] excludes) {
        Map<String, Object> map = new HashMap<>();
        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            try {
                field.setAccessible(true);
                if (field.get(obj) instanceof List) {
                    List<Map> dataList = new ArrayList<>();
                    List lists = (List) field.get(obj);
                    for (Object o : lists) {
                        Map<String, Object> paramMap = new HashMap<>();
                        Field[] fieldObjs = o.getClass().getDeclaredFields();
                        for (Field fieldObj : fieldObjs) {
                            fieldObj.setAccessible(true);
                            if(!isExclude(fieldObj.getName(),excludes)){
                                paramMap.put(fieldObj.getName(),fieldObj.get(o));
                            }
                        }
                        dataList.add(paramMap);
                    }
                    map.put(field.getName(), dataList);
                } else {
                    map.put(field.getName(), field.get(obj));
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }

        }
        return map;
    }

    private boolean isExclude(String str, String[] array){
        for (String val:array){
            if(str.equals(val)){
                return true;
            }
        }
        return false;
    }
}
