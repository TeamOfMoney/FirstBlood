package com.nantian.nfcm.util.pools;

import com.nantian.nfcm.util.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class BaseTaskServer {

	private BaseService baseService;

	@Autowired
	public BaseTaskServer(BaseService baseService){
		this.baseService = baseService;
	}

	@PostConstruct
	public void init() {
		baseService.baseDataInit();
	}
}
