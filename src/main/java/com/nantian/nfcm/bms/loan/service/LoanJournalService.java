package com.nantian.nfcm.bms.loan.service;

import com.nantian.nfcm.bms.auth.dao.UserInfoDao;
import com.nantian.nfcm.bms.loan.dao.LoanApplicationDao;
import com.nantian.nfcm.bms.loan.dao.LoanJournalDao;
import com.nantian.nfcm.bms.loan.dao.LoanOnlineDao;
import com.nantian.nfcm.bms.loan.entity.LoanApplication;
import com.nantian.nfcm.bms.loan.entity.LoanJournal;
import com.nantian.nfcm.bms.loan.entity.LoanOnline;
import com.nantian.nfcm.bms.loan.vo.LoanJournalBean;
import com.nantian.nfcm.util.BaseConst;
import com.nantian.nfcm.util.DateUtil;
import com.nantian.nfcm.util.ServiceException;
import com.nantian.nfcm.util.vo.GridData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoanJournalService {
    private LoanJournalDao loanJournalDao;
    private LoanOnlineDao loanOnlineDao;
    private LoanApplicationDao loanApplicationDao;

    @Autowired
    public LoanJournalService(LoanJournalDao loanJournalDao,LoanOnlineDao loanOnlineDao,
                              LoanApplicationDao loanApplicationDao) {
        this.loanJournalDao = loanJournalDao;
        this.loanOnlineDao = loanOnlineDao;
        this.loanApplicationDao = loanApplicationDao;
    }

    /**
     * 按条件查询贷款申请流水
     * @param page
     * @param size
     * @param loanJournalBean
     * @return
     * @throws ServiceException
     */
    public GridData<LoanJournalBean> findByCondition(int page, int size,LoanJournalBean loanJournalBean) throws ServiceException {
        Pageable pageable = new PageRequest(page, size);
        Specification<LoanJournal> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (loanJournalBean.getProcessUser() != null && !loanJournalBean.getProcessUser().equals("")) {
                Predicate processUser = criteriaBuilder.equal(root.get("loanOnline").get("curProcessUser").as(String.class), loanJournalBean.getProcessUser());
                predicates.add(processUser);
            }
            if (loanJournalBean.getProcessName() != null && !loanJournalBean.getProcessName().equals("")) {
                Predicate processName = criteriaBuilder.equal(root.get("loanOnline").get("curProcessName").as(String.class), loanJournalBean.getProcessName());
                predicates.add(processName);
            }
            if (loanJournalBean.getProcessStatus() != null && !loanJournalBean.getProcessStatus().equals("")) {
                Predicate processStatus = criteriaBuilder.equal(root.get("loanOnline").get("curProcessStatus").as(String.class), loanJournalBean.getProcessStatus());
                predicates.add(processStatus);
            }
            query.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
            return query.getRestriction();
        };
        Page<LoanJournal> loanJournalPage = loanJournalDao.findAll(specification, pageable);
        List<LoanJournal> loanJournals = loanJournalPage.getContent();
        List<LoanJournalBean> loanJournalBeans = new ArrayList<>();
        for (LoanJournal loanJournal : loanJournals) {
            //TODO
        }
        GridData<LoanJournalBean> gridData = new GridData<>();
        gridData.setData(loanJournalBeans);
        gridData.setNumber(loanJournalPage.getTotalElements());
        gridData.setPage(loanJournalPage.getNumber());
        gridData.setTotalPage(loanJournalPage.getTotalPages());
        return gridData;
    }

    /**
     * 分配
     * @param loanJournalBean
     * @throws ServiceException
     */
    @Transactional
    public void updateLoanJournalDistribution(LoanJournalBean loanJournalBean) throws ServiceException{
        String processUser = loanJournalBean.getCurProcessUser();
        List<Long> ids = loanJournalBean.getIds();
        if(ids==null||ids.size()==0){
            throw new ServiceException("贷款申请分配错误");
        }
        for(Long id : ids){
            //根据ID查询贷款流程流水信息，将分配的标志置为1
            LoanJournal loanJournal = loanJournalDao.findOne(id);

            Long loanId = loanJournal.getLoanId();
            LoanOnline loanOnline = loanJournal.getOnlineId();

            loanJournal.setProcessStatus(BaseConst.PROCESS_FINISH);
            loanJournal.setProcessUser(processUser);
            loanJournal.setFinishTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
            loanJournalDao.save(loanJournal);

            //新生成一条审核的贷款流程流水
            LoanJournal loanJournalReview = new LoanJournal();
            loanJournalReview.setLoanId(loanId);
            loanJournalReview.setOnlineId(loanOnline);
            loanJournalReview.setInitTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
            loanJournalReview.setProcessFlag(BaseConst.PROCESSFLAG_REVIEW);
            loanJournalReview.setProcessName(BaseConst.PROCESSNAME_REVIEW);
            loanJournalReview.setProcessStatus(BaseConst.PROCESS_INIT);
            loanJournalReview.setProcessUser(loanJournalBean.getProcessUser());
            loanJournalDao.save(loanJournalReview);

            //更新贷款申请表中的当前流水状态
            loanOnline.setCurProcessName(BaseConst.PROCESSNAME_REVIEW);
            loanOnline.setCurProcessStatus(BaseConst.PROCESS_INIT);
            loanOnline.setCurProcessUser(loanJournalBean.getProcessUser());
            loanOnlineDao.save(loanOnline);
        }
    }

    /**
     * 审核
     * @param loanJournalBean
     * @throws ServiceException
     */
    @Transactional
    public void updateLoanJournalReview(LoanJournalBean loanJournalBean) throws ServiceException{
        Long id = loanJournalBean.getId();
        //将贷款流程流水中审核的状态置为1
        LoanJournal loanJournal = loanJournalDao.findOne(id);
        Long loanId = loanJournal.getLoanId();
        LoanOnline loanOnline = loanJournal.getOnlineId();

        loanJournal.setProcessStatus(BaseConst.PROCESS_FINISH);
        loanJournal.setFinishTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournalDao.save(loanJournal);

        LoanJournal loanJournal2Review = new LoanJournal();
        loanJournal2Review.setLoanId(loanId);
        loanJournal2Review.setOnlineId(loanOnline);
        loanJournal2Review.setInitTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournal2Review.setProcessFlag(BaseConst.PROCESSFLAG_2REVIEW);
        loanJournal2Review.setProcessName(BaseConst.PROCESSNAME_2REVIEW);
        loanJournal2Review.setProcessStatus(BaseConst.PROCESS_INIT);
        loanJournal2Review.setProcessUser(loanJournalBean.getProcessUser());
        loanJournalDao.save(loanJournal2Review);

        //更新贷款申请表中的当前流水状态
        loanOnline.setCurProcessName(BaseConst.PROCESSNAME_2REVIEW);
        loanOnline.setCurProcessStatus(BaseConst.PROCESS_INIT);
        loanOnline.setCurProcessUser(loanJournalBean.getProcessUser());
        loanOnlineDao.save(loanOnline);
    }

    /**
     * 补件
     * @param loanJournalBean
     * @throws ServiceException
     */
    @Transactional
    public void updateLoanJournalResubmit(LoanJournalBean loanJournalBean) throws ServiceException{
        Long id = loanJournalBean.getId();
        //将贷款流程流水中审核的状态置为1
        LoanJournal loanJournal = loanJournalDao.findOne(id);
        Long loanId = loanJournal.getLoanId();
        LoanOnline loanOnline = loanJournal.getOnlineId();

        loanJournal.setProcessStatus(BaseConst.PROCESS_FINISH);
        loanJournal.setFinishTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournalDao.save(loanJournal);

        LoanJournal loanJournalResubmit = new LoanJournal();
        loanJournalResubmit.setLoanId(loanId);
        loanJournalResubmit.setOnlineId(loanOnline);
        loanJournalResubmit.setInitTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournalResubmit.setProcessFlag(BaseConst.PROCESSFLAG_RESUBMIT);
        loanJournalResubmit.setProcessName(BaseConst.PROCESSNAME_RESUBMIT);
        loanJournalResubmit.setProcessStatus(BaseConst.PROCESS_INIT);
        LoanApplication loanApplication = loanApplicationDao.findOne(loanJournal.getLoanId());
        loanJournalResubmit.setProcessUser(loanApplication.getOperator());
        loanJournalDao.save(loanJournalResubmit);

        //更新贷款申请表中的当前流水状态
        loanOnline.setCurProcessName(BaseConst.PROCESSNAME_RESUBMIT);
        loanOnline.setCurProcessStatus(BaseConst.PROCESS_INIT);
        loanOnline.setCurProcessUser(loanJournalBean.getProcessUser());
        loanOnlineDao.save(loanOnline);
    }

    /**
     * 退件
     * @param loanJournalBean
     * @throws ServiceException
     */
    @Transactional
    public void updateLoanJournalRefuse(LoanJournalBean loanJournalBean) throws ServiceException{
        Long id = loanJournalBean.getId();

        //将贷款流程流水中审核的状态置为1
        LoanJournal loanJournal = loanJournalDao.findOne(id);
        Long loanId = loanJournal.getLoanId();
        LoanOnline loanOnline = loanJournal.getOnlineId();

        loanJournal.setProcessStatus(BaseConst.PROCESS_FINISH);
        loanJournal.setFinishTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournalDao.save(loanJournal);

        //更新贷款申请表中的当前流水状态
        loanOnline.setCurProcessName(BaseConst.PROCESSNAME_REFUSE);
        loanOnline.setCurProcessStatus(BaseConst.PROCESS_FINISH);
        loanOnline.setCurProcessUser(loanJournalBean.getProcessUser());
        loanOnlineDao.save(loanOnline);
    }

    /**
     * 二审
     * @param loanJournalBean
     * @throws ServiceException
     */
    @Transactional
    public void updateLoanJournal2Review(LoanJournalBean loanJournalBean) throws ServiceException{
        Long id = loanJournalBean.getId();
        //将贷款流程流水中审核的状态置为1
        LoanJournal loanJournal = loanJournalDao.findOne(id);
        Long loanId = loanJournal.getLoanId();
        LoanOnline loanOnline = loanJournal.getOnlineId();

        loanJournal.setProcessStatus(BaseConst.PROCESS_FINISH);
        loanJournal.setFinishTime(DateUtil.getCurrentTime("yyyy-MM-dd"));
        loanJournalDao.save(loanJournal);

        //更新贷款申请表中的当前流水状态
        loanOnline.setCurProcessName(BaseConst.PROCESSNAME_2REVIEW);
        loanOnline.setCurProcessStatus(BaseConst.PROCESS_FINISH);
        loanOnline.setCurProcessUser(loanJournalBean.getProcessUser());
        loanOnlineDao.save(loanOnline);
    }
}