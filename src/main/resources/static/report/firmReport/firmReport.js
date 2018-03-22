var queryGridUrl = "../../firm/findByCondition.action";
/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("firmNum");
	headParam.push("firmName");
	headParam.push("contact");
	headParam.push("telephone");
	headParam.push("mobilePhone");
	headParam.push("fax");
	headParam.push("email");
	headParam.push("address");
	headParam.push("firmDate");
	headParam.push("remark");

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
	$("#queryGridBtn").click(function(){ 
		loadData();
	});
});


/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var firmNum = $("#query_firmNum").val();
	var firmName = $("#query_firmName").val();
	var param = {
			'firmNum' : firmNum,
			'firmName' : firmName
		};
		return param;
	
};

/*导出Excel和Pdf*/
var exportToExcel=function(){
	var firmNum = $("#query_firmNum").val();
	var firmName = $("#query_firmName").val();
	var buildingMsgCondition="";
	//var reportParams={};
	//reportParams["headerName"]="厂商编号#厂商名称#联系人#电话号码#手机号码#传真#电子邮箱#地址#注册时间#备注";
	//reportParams["title"]="厂商信息统计表";
	
		var params={};
		//params["reportBean.reportSqlNameCount"] = '';
		//params["reportBean.reportSqlNameGather"] = ''; 
		//params["reportBean.reportSqlName"] = '';
		//params["headerName"] ='厂商编号#厂商名称#联系人#电话号码#手机号码#传真#电子邮箱#地址#注册时间#备注';
		//params["title"] = "厂商信息统计表";
		params["firmNum"]=firmNum;
		params["firmName"]=firmName;
		//params["reportBean.reportParams.buildingMsgCondition"]=buildingMsgCondition;
	//	params["reportBean.reportParams.excelElementType"] = "0;0;0;0;0;0;0;";
		
		util.emmAjax({
			url : '../../firmReport/poiFirmReport.action',
			data:params,
			timeout:0,
			success : function(obj) {
				var excelData = util.str2Json(obj);
				var fileName = excelData.data;
				window.location.href="../../firmReport/downloadExcel.action?fileName=" + fileName;
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
