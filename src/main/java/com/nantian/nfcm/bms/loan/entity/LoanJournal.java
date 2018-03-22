package com.nantian.nfcm.bms.loan.entity;

import javax.persistence.*;

@Entity
@Table(name = "loan_journal")
public class LoanJournal {
    private Long id;
    private LoanApplication loanId;
    private String processName;
    private String processFlag;
    private String processResult;
    private String processUser;
    private String processStatus;
    private String initTime;
    private String finishTime;
    private Long lastId;
    private Long nextId;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(targetEntity = LoanApplication.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_id")
    public LoanApplication getLoanId() {
        return loanId;
    }

    public void setLoanId(LoanApplication loanId) {
        this.loanId = loanId;
    }

    @Basic
    @Column(name = "process_name")
    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    @Basic
    @Column(name = "process_flag")
    public String getProcessFlag() {
        return processFlag;
    }

    public void setProcessFlag(String processFlag) {
        this.processFlag = processFlag;
    }

    @Basic
    @Column(name = "process_result")
    public String getProcessResult() {
        return processResult;
    }

    public void setProcessResult(String processResult) {
        this.processResult = processResult;
    }

    @Basic
    @Column(name = "process_user")
    public String getProcessUser() {
        return processUser;
    }

    public void setProcessUser(String processUser) {
        this.processUser = processUser;
    }

    @Basic
    @Column(name = "process_status")
    public String getProcessStatus() {
        return processStatus;
    }

    public void setProcessStatus(String processStatus) {
        this.processStatus = processStatus;
    }

    @Basic
    @Column(name = "init_time")
    public String getInitTime() {
        return initTime;
    }

    public void setInitTime(String initTime) {
        this.initTime = initTime;
    }

    @Basic
    @Column(name = "finish_time")
    public String getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(String finishTime) {
        this.finishTime = finishTime;
    }

    @Basic
    @Column(name = "last_id")
    public Long getLastId() {
        return lastId;
    }

    public void setLastId(Long lastId) {
        this.lastId = lastId;
    }

    @Basic
    @Column(name = "next_id")
    public Long getNextId() {
        return nextId;
    }

    public void setNextId(Long nextId) {
        this.nextId = nextId;
    }
}
