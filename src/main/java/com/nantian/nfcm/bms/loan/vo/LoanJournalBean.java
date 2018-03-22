package com.nantian.nfcm.bms.loan.vo;

import java.util.ArrayList;

public class LoanJournalBean {
    private Long id;
    private Long loanId;
    private String processName;
    private String processFlag;
    private String processResult;
    private String processUser;
    private String processStatus;
    private String initTime;
    private String finishTime;

    private String curProcessName;
    private String curProcessStatus;
    private String curProcessUser;

    private ArrayList<Long> loanIds = new ArrayList<>();
    private ArrayList<Long> Ids = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getProcessFlag() {
        return processFlag;
    }

    public void setProcessFlag(String processFlag) {
        this.processFlag = processFlag;
    }

    public String getProcessResult() {
        return processResult;
    }

    public void setProcessResult(String processResult) {
        this.processResult = processResult;
    }

    public String getProcessUser() {
        return processUser;
    }

    public void setProcessUser(String processUser) {
        this.processUser = processUser;
    }

    public String getProcessStatus() {
        return processStatus;
    }

    public void setProcessStatus(String processStatus) {
        this.processStatus = processStatus;
    }

    public String getInitTime() {
        return initTime;
    }

    public void setInitTime(String initTime) {
        this.initTime = initTime;
    }

    public String getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(String finishTime) {
        this.finishTime = finishTime;
    }

    public String getCurProcessName() {
        return curProcessName;
    }

    public void setCurProcessName(String curProcessName) {
        this.curProcessName = curProcessName;
    }

    public String getCurProcessStatus() {
        return curProcessStatus;
    }

    public void setCurProcessStatus(String curProcessStatus) {
        this.curProcessStatus = curProcessStatus;
    }

    public String getCurProcessUser() {
        return curProcessUser;
    }

    public void setCurProcessUser(String curProcessUser) {
        this.curProcessUser = curProcessUser;
    }

    public ArrayList<Long> getLoanIds() {
        return loanIds;
    }

    public void setLoanIds(ArrayList<Long> loanIds) {
        this.loanIds = loanIds;
    }

    public ArrayList<Long> getIds() {
        return Ids;
    }

    public void setIds(ArrayList<Long> ids) {
        Ids = ids;
    }
}
