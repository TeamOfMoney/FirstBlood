package com.nantian.nfcm.bms.loan.entity;

import javax.persistence.*;

@Entity
@Table(name = "loan_application")
public class LoanApplication {
    private Long loanId;
    private String loanJournal;
    private Long orgId;
    private String orgCode;
    private String orgName;
    private String operator;
    private String initTime;
    private String distributionTime;
    private String examineTime;
    private String returnTime;
    private String detail;
    private String processName;
    private String processStatus;
    private String processUser;

    @Id
    @Column(name = "loan_id")
    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    @Basic
    @Column(name = "loan_journal")
    public String getLoanJournal() {
        return loanJournal;
    }

    public void setLoanJournal(String loanJournal) {
        this.loanJournal = loanJournal;
    }

    @Basic
    @Column(name = "org_id")
    public Long getOrgId() {
        return orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    @Basic
    @Column(name = "org_code")
    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    @Basic
    @Column(name = "org_name")
    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    @Basic
    @Column(name = "operator")
    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
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
    @Column(name = "distribution_time")
    public String getDistributionTime() {
        return distributionTime;
    }

    public void setDistributionTime(String distributionTime) {
        this.distributionTime = distributionTime;
    }

    @Basic
    @Column(name = "examine_time")
    public String getExamineTime() {
        return examineTime;
    }

    public void setExamineTime(String examineTime) {
        this.examineTime = examineTime;
    }

    @Basic
    @Column(name = "return_time")
    public String getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(String returnTime) {
        this.returnTime = returnTime;
    }

    @Basic
    @Column(name = "detail")
    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
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
    @Column(name = "process_status")
    public String getProcessStatus() {
        return processStatus;
    }

    public void setProcessStatus(String processStatus) {
        this.processStatus = processStatus;
    }
    @Basic
    @Column(name = "process_user")
    public String getProcessUser() {
        return processUser;
    }

    public void setProcessUser(String processUser) {
        this.processUser = processUser;
    }
}
