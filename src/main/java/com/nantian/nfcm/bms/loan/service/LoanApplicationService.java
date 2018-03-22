package com.nantian.nfcm.bms.loan.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nantian.nfcm.bms.loan.dao.LoanApplicationDao;
import com.nantian.nfcm.bms.loan.dao.LoanJournalDao;
import com.nantian.nfcm.bms.loan.dao.LoanOnlineDao;
import com.nantian.nfcm.bms.loan.entity.LoanApplication;
import com.nantian.nfcm.bms.loan.entity.LoanInfo;
import com.nantian.nfcm.bms.loan.entity.LoanJournal;
import com.nantian.nfcm.bms.loan.entity.LoanOnline;
import com.nantian.nfcm.bms.loan.vo.LoanBean;
import com.nantian.nfcm.util.BaseConst;
import com.nantian.nfcm.util.DateUtil;
import com.nantian.nfcm.util.ServiceException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoanApplicationService {
    private LoanApplicationDao loanApplicationDao;
    private LoanJournalDao loanJournalDao;
    private LoanOnlineDao loanOnlineDao;

    @Autowired
    public LoanApplicationService(LoanApplicationDao loanApplicationDao,
                                  LoanJournalDao loanJournalDao,LoanOnlineDao loanOnlineDao) {
        this.loanApplicationDao = loanApplicationDao;
        this.loanJournalDao = loanJournalDao;
        this.loanOnlineDao = loanOnlineDao;
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
        LoanApplication loanApplication = vo2po(loanBean);
        LoanApplication loanApplicationRet = loanApplicationDao.save(loanApplication);
        LoanBean loanBeanRet = po2vo(loanApplicationRet);

        //生成贷款流程当前流水
        LoanOnline loanOnline = new LoanOnline();
        loanOnline.setLoanId(loanApplicationRet.getLoanId());
        loanOnline.setCurProcessName(BaseConst.PROCESSNAME_DISTRIBUTION);
        loanOnline.setCurProcessUser(BaseConst.PROCESSNAME_DISTRIBUTION);
        loanOnline.setCurProcessStatus(BaseConst.PROCESS_INIT);
        LoanOnline loanOnlineRet = loanOnlineDao.save(loanOnline);

        //同时生成贷款流程当前记录和历史记录
        LoanJournal loanJournal = new LoanJournal();
        loanJournal.setLoanId(loanOnlineRet.getOnlineId());
        loanJournal.setOnlineId(loanOnlineRet);
        loanJournal.setOrgId(loanBean.getOrgId());
        loanJournal.setOrgCode(loanBean.getOrgCode());
        loanJournal.setOrgName(loanBean.getOrgName());
        loanJournal.setInitTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournal.setFinishTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournal.setProcessFlag(BaseConst.PROCESSFLAG_SUBMIT);
        loanJournal.setProcessName(BaseConst.PROCESSNAME_SUBMIT);
        loanJournal.setProcessStatus(BaseConst.PROCESS_FINISH);
        loanJournal.setProcessUser(loanBean.getOperator());
        loanJournalDao.save(loanJournal);

        //提交时生成分配流程流水
        LoanJournal loanJournalDist = new LoanJournal();
        loanJournalDist.setLoanId(loanOnlineRet.getOnlineId());
        loanJournalDist.setOnlineId(loanOnlineRet);
        loanJournalDist.setOrgId(loanBean.getOrgId());
        loanJournalDist.setOrgCode(loanBean.getOrgCode());
        loanJournalDist.setOrgName(loanBean.getOrgName());
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

    private LoanApplication vo2po(LoanBean loanBean){
        LoanApplication loanApplication = new LoanApplication();
        BeanUtils.copyProperties(loanBean,loanApplication);
        return loanApplication;
    }

    private LoanBean po2vo(LoanApplication loanApplication){
        LoanBean loanBean = new LoanBean();
        BeanUtils.copyProperties(loanApplication,loanBean);
        return loanBean;
    }
}