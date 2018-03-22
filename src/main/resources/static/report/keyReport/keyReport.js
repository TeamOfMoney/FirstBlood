var queryGridUrl = "../../key/findByCondition.action";
/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("keyId");
	headParam.push("keyValue");
	headParam.push("keyType");
	headParam.push("tagNum");
	headParam.push("batchId");
	//headParam.push("keyCiphertext");
	headParam.push("keyInitTime");
	var url = queryGridUrl;
	
	var defaultBtns = {"viewBtn":"hide","editBtn":"hide","removeBtn":"hide"};
	var operateBtns = [];
	
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "firmNum";
	gridObj["page"] = true;
	gridObj["checked"]=false;
	
	var nTGridBean = new NTGridBean();
	nTGridBean.init(gridObj);
	nTGridBean.loadGrid();
};

$(function(){
	//$("#query_startDate").val(GetDateStr(-30));
	//$("#query_endDate").val(GetDateStr(0));
	$("#query_startDate").datetimepicker({
		format: "yyyy-mm-dd",
		autoclose:true,
		minView:2,
		language:'cn'
	});
	$("#query_endDate").datetimepicker({
		format: "yyyy-mm-dd",
		autoclose:true,
		minView:2,
		language:'cn'
	});
	
	$("#queryGridBtn").click(function(){ 
		loadData();
	});
	
});


/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var batchId = $("#query_batchId").val();
	//var startDate = $("#query_startDate").val();
	//var endDate = $("#query_endDate").val();
	//var startDate=$("#query_startDate").val();
	//var endDate=getFormatDateStr($("#query_endDate").val(),1);
	var param = {
			'batchId' : batchId//,
			//'startDate' : startDate,
			//'endDate' : endDate
		};
		return param;
	
};

/*导出Excel和Pdf*/
var exportToExcel=function(){
	var batchId = $("#query_batchId").val();
	//var startDate=$("#query_startDate").val();
	//var endDate=getFormatDateStr($("#query_endDate").val(),1);
	var params={};
	
	params["batchId"]=batchId;
	//params["startDate"]=startDate;
	//params["endDate"]=endDate;
	
	util.emmAjax({
		url : '../../keyReport/poiKeyReport.action',
		data:params,
		timeout:0,
		success : function(obj) {
			var excelData = util.str2Json(obj);
			var fileName = excelData.data;
			window.location.href="../../keyReport/downloadExcel.action?fileName=" + fileName;
		}
	});
	
}; 


/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};
