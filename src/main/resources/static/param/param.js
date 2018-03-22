var queryGridUrl = "../param/findParam.action";

var addDataUrl = "../param/addParam.action"; 

var editDataUrl = "../param/updateParam.action";

var removeDataUrl = "../param/removeParam.action";

var removesDataUrl = "../param/removeParams.action";

var querDetialUrl = "../param/findParamById.action";

var nowOperate;

/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("paramName");
	headParam.push("paramValue");
	headParam.push("paramDesc");
	
	var url = queryGridUrl;
	
	var defaultBtns = {"viewBtn":"hide","editBtn":"show","removeBtn":"show"};
	var operateBtns = [];
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "paramName";
	gridObj["page"] = true;
	
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
 * 显示模态框
 */
var  showModel = function(nowOperate){
	resetAddOrEditForm();
	$("#addOrEditModal").modal("show");
	AddOrEditCheck();
	if(nowOperate=="edit"){
		$("#add_name").attr("disabled",true);
	}
	else{
		$("#add_name").attr("disabled",false);
	}
	
};
/**
 * 关闭模态框
 */
var hideModel = function(){
	$("#addOrEditModal").modal("hide");
};

/**
 * 清空form
 */
var resetAddOrEditForm = function(){
	$("#addOrEditForm")[0].reset();
	clearAddOrEidtBms();
};

/**
 * 新增或修改成功之后的事件
 * @return
 */
var addOrEditCompleteFun = function(){
	hideModel();
	loadData();
};



/**
 * 新增
 * @return
 */
var addData = function(param){
	operateUtil.addData(addDataUrl,param,addOrEditCompleteFun);
};

/**
 * 详细
 */
var viewData = function(param,viewSuccessFun){
	operateUtil.viewData(querDetialUrl,param,viewSuccessFun);
};

/**
 * 编辑
 */
var editData = function(param){
	operateUtil.editData(editDataUrl,param,addOrEditCompleteFun);
};

/**
 * 删除
 */
var removeData = function(param){
	operateUtil.removeData(removeDataUrl,param,addOrEditCompleteFun);
};

/**
 * 批量删除
 */
var removeDataOfNumbers = function(param){
	operateUtil.removeData(removesDataUrl,param,addOrEditCompleteFun);
	
};



/**
 * 删除
 */
var removeBtn = function(btn){
	var pk = getPk(btn);
	var param = {"paramName":pk};
	removeData(param);
};

/**
 * 获得批量删除的参数
 * @return
 */
var getRemoveDataOfNumbersParam = function(){
	var checkboxs = $("#table").find("tbody").find("input[type='checkbox']");
	var pks = new Array();
	
	$(checkboxs).each(function(index,ele){
		if($(this).is(":checked")){
			var pk = getPk($(this).parent());
			pks.push(pk);
		}
	});

	if(pks.length>0){
		var param="{";
		for(var i=0;i<pks.length;i++)
			{
				param=param+('\"paramNames['+i+']\":\"'+pks[i]+'\",');
			}
		param = param.substring(0, param.length - 1);
		param += '}';
		param=util.str2Json(param);
		//var param = {"paramNames":pks};
		return param;
	}
	else{
		util.sysTips("请选择需要删除的数据！ ","selectremove");
	}
};


/**
 * 编辑回填
 */
var editDataFill=function(pk){
	var param = {"paramName":pk};
	viewData(param,dataFill);
};

/**
 * 编辑
 */
var editBtn = function(btn){
	nowOperate = "edit";
	$("#action").html('编辑参数');
	showModel(nowOperate);
	var pk = getPk(btn);
	editDataFill(pk);
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	$("#addBtn").click(function(){
		nowOperate = "add";
		$("#action").html('新增参数');
		showModel(nowOperate);
	});
	
	$("#removeOfNumbersBtn").click(function(){
		var param = getRemoveDataOfNumbersParam();
		if(param!=undefined){
			removeDataOfNumbers(param);
		}
	});
	
	
	$("#addOrEditSaveBtn").click(function(){
		var result=addOrEditBmsPraramCheck();
		if(nowOperate=="add"&&result){
			var param = getAddorEditParam();
			if(param!=undefined){
				addData(param);
			}
		
		}else if(nowOperate=="edit"&&result){
			var param = getAddorEditParam();
			if(param!=undefined){
				editData(param);
			}
		}
	});
	
	
	loadData();
	
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/**
 * 详情
 */
var viewBtn = function(btn){
	
};



/**
 * 获得增加或编辑的参数
 * @return
 */
var getAddorEditParam = function(){
	var add_name = $("#add_name").val();
	var add_value = $("#add_value").val();
	var add_desc = $("#add_desc").val();
	var param = {
			'paramName' : add_name,
			'paramValue' : add_value,
			'paramDesc' : add_desc
		};
	return param;
};
/**
 * 添加或编辑的正则表达式判断
 */
var AddOrEditCheck=function(){	
	$("#add_name").blur(function(){
		checkadd_name();
	});
	$("#add_value").blur(function(){
		checkadd_value();			
	});
	$("#add_desc").blur(function(){
		checkadd_desc();			
	});
};
/**
 * 折别类型信息维护添加的保存按钮判断全部信息是否符合
 */
addOrEditBmsPraramCheck=function(){
	var pdc=checkadd_name();
	var pn=checkadd_value();
	var pds=checkadd_desc();
	return pdc&&pn&&pds;
};
/**
* 清除添加或编辑设备类型信息样式
*/
clearAddOrEidtBms=function(){
	check.clear("add_name");
	check.clear("add_value");
	check.clear("add_desc");
};
/**
 * 参数名称
 */
checkadd_name=function(){
	var result=true;
	var patrn=check.checkNoCN;
	var sysMsg="参数名称不能有中文！";
	var checkId="add_name";
	var msg="参数名称";
	var checkObj={};
	checkObj["patrn"]=patrn;
	checkObj["msg"]=msg;
	checkObj["sysMsg"]=sysMsg;
	checkObj["checkId"]=checkId;
	checkObj["rules"]=[{"patrn":patrn,"sysMsg":sysMsg}];
	result=check.onCheck(checkObj);
	return result;
};
 /**
 * 参数值
 */
checkadd_value=function(){
	var result=true;
	var patrn=check.checkChar;
	var checkId="add_value";
	var sysMsg="参数值只能在1~30个字符之间！";
	var msg="参数值";
	var checkObj={};
	checkObj["patrn"]=patrn;
	checkObj["msg"]=msg;
	checkObj["sysMsg"]=sysMsg;
	checkObj["checkId"]=checkId;
	result=check.onCheck(checkObj);
	return result;
};
/**
 * 参数描述
 */
checkadd_desc=function(){
	var result=true;
	var patrn=check.checkChar;
	var checkId="add_desc";
	var sysMsg="参数描述只能在1~32个字符之间！";
	var msg="参数描述";
	var checkObj={};
	checkObj["patrn"]=patrn;
	checkObj["msg"]=msg;
	checkObj["sysMsg"]=sysMsg;
	checkObj["checkId"]=checkId;
	checkObj["isNull"]=false;
	result=check.onCheck(checkObj);
	return result;
};


/**
 * 编辑回调回填
 * @param data
 * @return
 */
var dataFill = function(data){
	var object = util.str2Json(data).data;
	$("#add_name").val(object.paramName);
	$("#add_value").val(object.paramValue);
	$("#add_desc").val(object.paramDesc);
};
