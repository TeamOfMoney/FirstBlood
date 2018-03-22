package com.nantian.nfcm.bms.loan.web;

import com.nantian.nfcm.bms.loan.service.LoanApplicationService;
import com.nantian.nfcm.bms.loan.vo.LoanBean;
import com.nantian.nfcm.util.vo.ResultInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/loan")
public class LoanApplicationController {
    private static Logger log = LoggerFactory.getLogger(LoanApplicationController.class);
    private LoanApplicationService loanApplicationService;

    public LoanApplicationController(LoanApplicationService loanApplicationService) {
        this.loanApplicationService = loanApplicationService;
    }

    @RequestMapping("/addLoan")
    @ResponseBody
    private ResultInfo addLoan(LoanBean loanBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            LoanBean loan = loanApplicationService.addLoanApplication(loanBean);
            resultInfo.setSuccess("true");
            resultInfo.setData(loan);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/updateLoan")
    @ResponseBody
    private ResultInfo updateLoan(LoanBean loanBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            LoanBean loan = loanApplicationService.updateLoanApplication(loanBean);
            resultInfo.setSuccess("true");
            resultInfo.setData(loan);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }

    @RequestMapping("/findById")
    @ResponseBody
    private ResultInfo findById(LoanBean loanBean) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        try {
            LoanBean loan = loanApplicationService.findById(loanBean.getLoanId());
            resultInfo.setSuccess("true");
            resultInfo.setData(loan);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultInfo.setSuccess("false");
            resultInfo.setData(e.getMessage());
        }
        return resultInfo;
    }
}
