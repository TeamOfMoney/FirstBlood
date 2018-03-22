package com.nantian.nfcm.bms.loan.entity;

import javax.persistence.*;

@Entity
@Table(name = "loan_online")
public class LoanOnline {
    private Long onlineId;
    private Long loanId;
    private String curProcessName;
    private String curProcessStatus;
    private String curProcessUser;

    @Id
    @Column(name = "online_id")
    public Long getOnlineId() {
        return onlineId;
    }

    public void setOnlineId(Long onlineId) {
        this.onlineId = onlineId;
    }

    @Basic
    @Column(name = "loan_id")
    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    @Basic
    @Column(name = "cur_process_name")
    public String getCurProcessName() {
        return curProcessName;
    }

    public void setCurProcessName(String curProcessName) {
        this.curProcessName = curProcessName;
    }

    @Basic
    @Column(name = "cur_process_status")
    public String getCurProcessStatus() {
        return curProcessStatus;
    }

    public void setCurProcessStatus(String curProcessStatus) {
        this.curProcessStatus = curProcessStatus;
    }

    @Basic
    @Column(name = "cur_process_user")
    public String getCurProcessUser() {
        return curProcessUser;
    }

    public void setCurProcessUser(String curProcessUser) {
        this.curProcessUser = curProcessUser;
    }
}
