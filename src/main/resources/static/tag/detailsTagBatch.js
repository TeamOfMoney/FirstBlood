var util = new NT.utilObj.util();
/*
 * 用户列表显示
 */
var queryGridUrl = "../tag/findByCondition.action";
var querDetialUrl = "../tag/findById.action";

/**
 * 加载数据
 */
var loadData = function(batchId){
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
	
	var defaultBtns = {"viewBtn":"show","editBtn":"hidden","removeBtn":"hidden"};
	var operateBtns = [];
	
	var querParam ={
			'batchId' : batchId
		};
	
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
	var batchId = getUrlParam('batchId');
	
	loadData(batchId);	
	
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * 详情
 */
var viewBtn = function(btn){
	var tagNum = getPk(btn);
	var url = "./detailsTag.html?tagNum=" + tagNum;
	window.location.href = encodeURI(url);
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

/*
 * 获取url参数
 */
var getUrlParam=function(name) {
	 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	 var urlParam = window.location.search.substr(1);
	 var r = decodeURI(urlParam).match(reg);  //匹配目标参数
	 if (r != null) return unescape(r[2]); return null; //返回参数值

};




/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};
