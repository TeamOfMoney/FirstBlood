package com.nantian.nfcm.util.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.nantian.nfcm.bms.auth.entity.UserInfo;
import com.nantian.nfcm.util.entity.Param;

public interface ParamDao extends JpaRepository<Param, String>,JpaSpecificationExecutor<Param>{

}
