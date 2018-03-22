var util = new NT.utilObj.util();
/*
 * 用户列表显示
 */
var queryGridUrl = "../../tag/findByCondition.action";
var firmOptionUrl = "../../firm/queryFirmOptions.action";
/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("tagNum");
	//headParam.push("tagSn");
	/*headParam.push("tagSp");*/
	headParam.push("tagState");
	headParam.push("tagInitTime");
	headParam.push("tagAllocateTime");
	//headParam.push("tagKey");
	//headParam.push("tagCiphertext");
	//headParam.push("tagMac");
	headParam.push("firmName");
	headParam.push("productName");
	//headParam.push("productSerial");
	
	var url = queryGridUrl;
	
	var defaultBtns = {"viewBtn":"hidden","editBtn":"hidden","removeBtn":"hidden"};
	var operateBtns = [];
	
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "tagNum";
	gridObj["page"] = true;
	gridObj["checked"]=false;
	
	var tagStateFormat = function(val){
		if(val=="0"){
			return "初始化";
		}
		
		if(val=="1"){
			return "激活";
		}
		return "";
	};
	
	var headFormat = {"tagState":tagStateFormat};
	gridObj["headFormat"] = headFormat;
	
	var nTGridBean = new NTGridBean();
	nTGridBean.init(gridObj);
	nTGridBean.loadGrid();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	
	$("#queryGridBtn").click(function(){
		loadData();
	});
	firmOption_query();
	//loadData();	
	
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var QNum = $("#query_tagNum").val();
	//var QName = $("#query_tagSp").val();
	var QFnum = $("#query_firmNum").val();
	var param = {
		'tagNum' : QNum,
	//	'tagSp' : QName,
		'firmNum' : QFnum
	};
	return param;
};

function firmOption_query() {
	var param=[];
	var selectObj = {};
	selectObj["url"] = firmOptionUrl;
	selectObj["id"] = 'query_firmNum';
	selectObj["param"] = param;
	selectObj["valueParam"] = 'firmNum';
	selectObj["htmlParam"] = 'firmName';
	selectObj["defaultSelectedValue"] = null;
	var selectOption = new SelectOption();
	selectOption.clear('query_firmNum');
	selectOption.loadOption(selectObj);
};

/*导出Excel*/
var exportToExcel=function(){
	var QNum = $("#query_tagNum").val();
	var QFnum = $("#query_firmNum").val();
	var params={};
	params["tagNum"]=QNum;
	params["firmNum"]=QFnum;
	util.emmAjax({
			url : '../../tagReport/poiTagReport.action',
			data:params,
			timeout:0,
			success : function(obj) {
				var excelData = util.str2Json(obj);
				var fileName = excelData.data;
				window.location.href="../../tagReport/downloadExcel.action?fileName=" + fileName;
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
