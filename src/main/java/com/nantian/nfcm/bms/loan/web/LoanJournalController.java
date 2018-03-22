package com.nantian.nfcm.bms.loan.web;

import com.nantian.nfcm.bms.loan.service.LoanJournalService;
import com.nantian.nfcm.bms.loan.vo.LoanJournalBean;
import com.nantian.nfcm.util.vo.GridData;
import com.nantian.nfcm.util.vo.ResultInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/loanJournal")
public class LoanJournalController {
    private static Logger log = LoggerFactory.getLogger(LoanJournalController.class);
    private LoanJournalService loanJournalService;

    public LoanJournalController(LoanJournalService loanJournalService) {
        this.loanJournalService = loanJournalService;
    }

    @RequestMapping("/findByCondition")
    @ResponseBody
    private ResultInfo findByCondition(int page, int size, LoanJournalBean loanJournalBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            GridData<LoanJournalBean> gd = loanJournalService.findByCondition(page, size, loanJournalBean);
            resultInfo.setData(gd.getData());
            resultInfo.setNumber(gd.getNumber());
            resultInfo.setPage(gd.getPage());
            resultInfo.setTotalPage(gd.getTotalPage());
            resultInfo.setSuccess("true");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/updateLoanJournalDistribution")
    @ResponseBody
    private ResultInfo updateLoanJournalDistribution(LoanJournalBean loanJournalBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            loanJournalService.updateLoanJournalDistribution(loanJournalBean);
            resultInfo.setSuccess("true");
            resultInfo.setData("");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/updateLoanJournalReview")
    @ResponseBody
    private ResultInfo updateLoanJournalReview(LoanJournalBean loanJournalBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            loanJournalService.updateLoanJournalReview(loanJournalBean);
            resultInfo.setSuccess("true");
            resultInfo.setData("");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/updateLoanJournalResubmit")
    @ResponseBody
    private ResultInfo updateLoanJournalResubmit(LoanJournalBean loanJournalBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            loanJournalService.updateLoanJournalResubmit(loanJournalBean);
            resultInfo.setSuccess("true");
            resultInfo.setData("");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/updateLoanJournalRefuse")
    @ResponseBody
    private ResultInfo updateLoanJournalRefuse(LoanJournalBean loanJournalBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            loanJournalService.updateLoanJournalRefuse(loanJournalBean);
            resultInfo.setSuccess("true");
            resultInfo.setData("");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/updateLoanJournal2Review")
    @ResponseBody
    private ResultInfo updateLoanJournal2Review(LoanJournalBean loanJournalBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            loanJournalService.updateLoanJournal2Review(loanJournalBean);
            resultInfo.setSuccess("true");
            resultInfo.setData("");
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
}
