var util = new NT.utilObj.util();
/*
 * 列表显示
 */
var queryGridUrl = "../tagBatch/findByCondition.action";

var firmOptionUrl = "../firm/queryFirmOptions.action";


var querDetialUrl = "../tagBatch/findById.action";

var nowOperate;

var store_old={};
var store_new={};
function compareStore(){
	var returnValue=1;
	$.each(store_new,function(key,ele){
			
			var valueOld=store_old[key];
			if(ele!=valueOld){
				returnValue=0;
			}
			
		}
	);
	return returnValue;
}

function sortArr(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				var temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	return arr;
}

/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("batchId");
	headParam.push("batchTime");
	headParam.push("batchSum");
	headParam.push("batchOperator");
	headParam.push("firmName");
	
	var url = queryGridUrl;
	var defaultBtns = {"viewBtn":"show","editBtn":"hidden","removeBtn":"hidden"};
	var operateBtns = [];
	var querParam = getQueryGridParam();
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "batchId";
	gridObj["page"] = true;
	gridObj["checked"]=false;
	
	var nTGridBean = new NTGridBean();
	nTGridBean.init(gridObj);
	nTGridBean.loadGrid();
};


/**
 * 获得pk
 */
var getPk = function(btn){
	var pk = $(btn).parent().parent().parent().attr("pk");
	return pk;
};


/**
 * 详情
 */
var viewData = function(param,viewSuccessFun){
	operateUtil.viewData(querDetialUrl,param,viewSuccessFun);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	$("#queryGridBtn").click(function(){
		loadData();
	});
	firmOption_query();
	loadData();	
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 详情
 */
var viewBtn = function(btn){
	var batchId = getPk(btn);
	//var url = "./detailsTagBatch.html?batchId=" + batchId;
	var url = "./detailsTagBatch.html?batchId="+batchId;
	window.location.href = encodeURI(url);
};


/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var QOper = $("#query_batchOperator").val();
	var QName = $("#query_firmNum").val();
	var param = {
		'batchOperator' : QOper,
		'firmNum' : QName
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

/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};
