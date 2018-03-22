package com.nantian.nfcm.bms.loan.dao;

import com.nantian.nfcm.bms.loan.entity.LoanOnline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LoanOnlineDao extends JpaRepository<LoanOnline, Long>, JpaSpecificationExecutor<LoanOnline> {
}
