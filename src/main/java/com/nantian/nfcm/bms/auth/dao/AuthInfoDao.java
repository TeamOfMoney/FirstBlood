package com.nantian.nfcm.bms.auth.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.nantian.nfcm.bms.auth.entity.AuthInfo;

public interface AuthInfoDao extends JpaRepository<AuthInfo, Long>, JpaSpecificationExecutor<AuthInfo> {

}
