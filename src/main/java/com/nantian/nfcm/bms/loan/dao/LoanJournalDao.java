package com.nantian.nfcm.bms.loan.dao;

import com.nantian.nfcm.bms.loan.entity.LoanJournal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LoanJournalDao extends JpaRepository<LoanJournal, Long>, JpaSpecificationExecutor<LoanJournal> {
}
