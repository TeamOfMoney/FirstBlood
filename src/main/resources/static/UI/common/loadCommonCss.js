var loadCss = function( url ){ 
	document.write("<link href='"+url+"' rel='stylesheet' type='text/css' />"); 
	
}; 


var loadCommonCss = function(){
	

	loadCss(webPath+"/UI/s-view/bootstrap/css/bootstrap.min.css");
	loadCss(webPath+"/UI/s-view/layer/skin/layer.css");
	loadCss(webPath+"/UI/common/css/nt-table.css");
	loadCss(webPath+"/UI/common/css/emm-ui.css");
	loadCss(webPath+"/UI/common/css/uniform.css");
	loadCss(webPath+"/UI/s-view/page/pagination.css");
	loadCss(webPath+"/UI/s-view/zTree/css/zTreeStyle/zTreeStyle.css");
	loadCss(webPath+"/UI/s-view/zTree/css/metroStyle/metroStyle.css");
	loadCss(webPath+"/UI/common/css/check.css");
	loadCss(webPath+"/UI/s-view/time/css/bootstrap-datetimepicker.min.css");
	loadCss(webPath+"/UI/s-view/bootstrap/font-awesome/css/font-awesome.css");
	loadCss(webPath+"/UI/s-view/nmm-ui/font-awesome/css/font-awesome.css?v=4.3.0");
	loadCss(webPath+"/UI/fileinput/css/fileinput.css");
	loadCss(webPath+"/UI/fileinput/themes/explorer-fa/theme.css");
	
};

loadCommonCss();

