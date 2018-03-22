package com.nantian.nfcm.bms.loan.vo;

import com.nantian.nfcm.bms.loan.entity.LoanApplication;
import com.nantian.nfcm.bms.loan.entity.LoanInfo;

public class LoanBean extends LoanApplication{
    private LoanInfo loanInfo;

    public LoanInfo getLoanInfo() {
        return loanInfo;
    }

    public void setLoanInfo(LoanInfo loanInfo) {
        this.loanInfo = loanInfo;
    }
}
