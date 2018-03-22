package com.nantian.nfcm.util.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ResultFilter {
    /**
     * 需要排除的字段
     * @return String[]
     */
    String[] excludes() default {};
}
