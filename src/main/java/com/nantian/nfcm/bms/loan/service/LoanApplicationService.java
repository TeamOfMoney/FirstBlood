package com.nantian.nfcm.bms.loan.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nantian.nfcm.bms.loan.dao.LoanApplicationDao;
import com.nantian.nfcm.bms.loan.dao.LoanJournalDao;
import com.nantian.nfcm.bms.loan.entity.LoanApplication;
import com.nantian.nfcm.bms.loan.entity.LoanInfo;
import com.nantian.nfcm.bms.loan.entity.LoanJournal;
import com.nantian.nfcm.bms.loan.vo.LoanBean;
import com.nantian.nfcm.util.BaseConst;
import com.nantian.nfcm.util.DateUtil;
import com.nantian.nfcm.util.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoanApplicationService {
    private LoanApplicationDao loanApplicationDao;
    private LoanJournalDao loanJournalDao;

    @Autowired
    public LoanApplicationService(LoanApplicationDao loanApplicationDao,
                                  LoanJournalDao loanJournalDao) {
        this.loanApplicationDao = loanApplicationDao;
        this.loanJournalDao = loanJournalDao;
    }

    public LoanApplication findById(Long loanId) throws ServiceException {
        return loanApplicationDao.findOne(loanId);
    }

    @Transactional
    public LoanBean addLoanApplication(LoanBean loanBean) throws ServiceException {
        String journalNo = loanBean.getOperator() + DateUtil.getCurrentTime("yyyyMMddHHmmss");
        loanBean.setLoanJournal(journalNo);
        LoanInfo loanInfo = loanBean.getLoanInfo();

        ObjectMapper mapper = new ObjectMapper();
        try {
            String detail = mapper.writeValueAsString(loanInfo);
            loanBean.setDetail(detail);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new ServiceException("贷款申请详细信息错误");
        }
        LoanBean loanBeanRet = loanApplicationDao.save(loanBean);
        //同时生成贷款流程当前记录和历史记录
        LoanJournal loanJournal = new LoanJournal();
        loanJournal.setLoanId(loanBeanRet);
        loanJournal.setInitTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournal.setFinishTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournal.setProcessFlag(BaseConst.PROCESSFLAG_SUBMIT);
        loanJournal.setProcessName(BaseConst.PROCESSNAME_SUBMIT);
        loanJournal.setProcessStatus(BaseConst.PROCESS_FINISH);
        loanJournal.setProcessUser(loanBean.getOperator());
        loanJournalDao.save(loanJournal);

        //提交时生成分配流程流水
        LoanJournal loanJournalDist = new LoanJournal();
        loanJournalDist.setLoanId(loanBeanRet);
        loanJournalDist.setInitTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournalDist.setProcessFlag(BaseConst.PROCESSFLAG_DISTRIBUTION);
        loanJournalDist.setProcessName(BaseConst.PROCESSNAME_DISTRIBUTION);
        loanJournalDist.setProcessStatus(BaseConst.PROCESS_INIT);
        loanJournalDao.save(loanJournalDist);
        return loanBeanRet;
    }

    @Transactional
    public LoanBean updateLoanApplication(LoanBean loanBean) throws ServiceException{
        Long loanId = loanBean.getLoanId();
        LoanApplication loanApplication = loanApplicationDao.findOne(loanId);
        if(loanApplication==null){
            throw new ServiceException("贷款申请信息不存在");
        }
        LoanInfo loanInfo = loanBean.getLoanInfo();
        ObjectMapper mapper = new ObjectMapper();
        try {
            loanApplication.setDetail(mapper.writeValueAsString(loanInfo));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new ServiceException("贷款申请详细信息错误");
        }
        loanApplicationDao.save(loanApplication);
        return loanBean;
    }
}