var loadJs = function( url ){ 
	document.write("<script text='javascript' src='"+url+"'></script>");
}; 


var loadCommonJs = function(){
	loadJs(webPath+"/UI/s-view/ie/html5shiv.js");
	loadJs(webPath+"/UI/s-view/ie/respond.min.js");
	loadJs(webPath+"/UI/js/jquery-1.11.2.min.js");
	loadJs(webPath+"/UI/s-view/bootstrap/bootstrap.min.js");
	loadJs(webPath+"/UI/s-view/layer/layer.js");
	loadJs(webPath+"/UI/common/js/nt-table.js");
	loadJs(webPath+"/UI/s-view/page/pagination.js");
	loadJs(webPath+"/UI/s-view/page/page.js");
	loadJs(webPath+"/UI/common/js/jQuery.md5.js");
	loadJs(webPath+"/UI/common/js/namespace.js");
	loadJs(webPath+"/UI/common/js/emm_util.js");
	loadJs(webPath+"/UI/common/js/emm-ui.js");
	loadJs(webPath+"/UI/common/js/date-util.js");
	loadJs(webPath+"/UI/common/js/uniform.js");
	loadJs(webPath+"/UI/common/js/emm-operate.js");
	loadJs(webPath+"/UI/s-view/zTree/js/jquery.ztree.core-3.5.js");
	loadJs(webPath+"/UI/s-view/zTree/js/jquery.ztree.excheck-3.5.js");
	loadJs(webPath+"/UI/common/js/selects.js");
	loadJs(webPath+"/UI/common/js/check.js");
	loadJs(webPath+"/UI/common/js/checkForm.js");
	loadJs(webPath+"/UI/s-view/time/js/bootstrap-datetimepicker.min.js");
	loadJs(webPath+"/UI/s-view/time/js/locales/bootstrap-datetimepicker.zh-CN.js");
	loadJs(webPath+"/UI/fileinput/js/fileinput.js");
	loadJs(webPath+"/UI/fileinput/js/locales/zh.js");
	loadJs(webPath+"/UI/fileinput/js/plugins/sortable.js");
	loadJs(webPath+"/UI/fileinput/themes/explorer-fa/theme.js");
	loadJs(webPath+"/UI/fileinput/themes/fa/theme.js");
	loadJs(webPath+"/UI/common/js/login_timeout.js");
};
loadCommonJs();



