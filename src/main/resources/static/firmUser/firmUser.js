var util = new NT.utilObj.util();
/*
 * 用户列表显示
 */
var queryGridUrl = "../firmUser/findByCondition.action";

var addDataUrl = "../firmUser/addFirmUser.action";
var editDataUrl = "../firmUser/updateFirmUser.action";
var removeDataUrl = "../firmUser/delFirmUser.action";

var firmOptionUrl = "../firm/queryFirmOptions.action";

/*
 *查询用户资料 
 */
var querDetialUrl = "../firmUser/findById.action";

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
	headParam.push("firmUsrId");
	headParam.push("firmUsername");
	headParam.push("firmName");
	headParam.push("mobilePhone");
	headParam.push("email");
	headParam.push("registerTime");
	
	var url = queryGridUrl;
	
	var defaultBtns = {"viewBtn":"show","editBtn":"show","removeBtn":"show"};
	var operateBtns = [];
	
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "firmUsrId";
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
 * 显示模态框
 */
var  showModel = function(){
	resetAddOrEditForm();
	$("#addOrEditModal").modal("show");
//	AddOrEditCheck();
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
	$('span[id="errormsg"]').remove();
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
 * 详情
 */
var viewData = function(param,viewSuccessFun){
	operateUtil.viewData(querDetialUrl,param,viewSuccessFun);
};

/**
 *编辑
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
 * 删除
 */
var removeBtn = function(btn){
	var pk = getPk(btn);
	
	util.emmAjax({
		url : querDetialUrl,
		data:{'firmUsrId':pk},
		type : 'post',
		success : function(data) {
			var obj = util.str2Json(data);
			var firmUserObj=obj.data;
			if(obj.success=='true')
				{
					var param='{'
						param=param+('\"firmUsrId\":\"'+firmUserObj.firmUsrId+ '\",');
						param=param+('\"firmNum\":\"'+firmUserObj.firmNum+ '\",');
						param=param+('\"firmUsername\":\"'+firmUserObj.firmUsername+ '\",');
					
						param=param+('\"mobilePhone\":\"'+firmUserObj.mobilePhone+ '\",');
						
						param=param+('\"email\":\"'+firmUserObj.email+ '\",');
						param=param+('\"registerTime\":\"'+firmUserObj.registerTime+ '\",');
					
						param += '}';
						param=str2Json(param);
					removeData(param);
				}
			else{
				util.sysAlert(obj.data);
			}
			
		}
	});
};



/**
 * 编辑回填
 */
var editDataFill=function(pk){
	var param = {"firmUsrId":pk};
	viewData(param,dataFill);
};

/**
 * 编辑
 */
var editBtn = function(btn){
	var pk = getPk(btn);
	nowOperate = "edit";
	$("#action").html('编辑厂商用户信息');
	showModel();
	$("#addFirmUsrId").attr("disabled",true);
	$("#passw1").hide();
	$("#passw2").hide();
	editDataFill(pk);
	
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	window.checkForm.openFun().init({path:webPath,form:'addOrEditForm'}); 
	$("#addRegisterTime").val(GetDateStr(-30));
	$("#addRegisterTime").datetimepicker({
		format: "yyyy-mm-dd",
		autoclose:true,
		minView:2,
		language:'cn'
	});
	
	$("#addBtn").click(function(){
		nowOperate = "add";
		$("#passw1").show();
		$("#passw2").show();
		$("#addFirmUsrId").attr("disabled",false);
		firmOption_add(null);
		$("#action").html('新增厂商用户信息');
		showModel();
	});
	
	$("#removeOfNumbersBtn").click(function(){
		var param = getRemoveDataOfNumbersParam();
		if(param!=undefined){
			removeDataOfNumbers(param);
		}
	});
	
	
	$("#addOrEditSaveBtn").click(function(){
		var returnValue=window.checkForm.openFun().onSubmit();
		if(nowOperate=="add"&&returnValue ){
			var param = getAddParam();
			if(param!=undefined){
				addData(param);
			}
		}else if(nowOperate=="edit"&&returnValue ){
			var param = getEditParam();
			if(param!=undefined){
				var returnValue=compareStore();
				if(returnValue==0){
					if(param!=null){
						editData(param);
					}
				}else{
					util.sysAlert("您尚未更改任何内容，保存失败！");
				}
			}
		}

	});
	
	$("#queryGridBtn").click(function(){
		loadData();
	});
	$("#upload").click(function(){
		$("#upload_form").submit();
	});
	
	firmOption_query();
	loadData();	
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/**
 * 详情
 */
var viewBtn = function(btn){
	var firmUsrId = getPk(btn);
	var url = "./detailsFirmUser.html?firmUsrId=" + firmUsrId;
	window.location.href = encodeURI(url);
};


/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	//var QId = $("#query_firmUsrId").val();
	var QNum = $("#query_firmNum").val();
	var QName = $("#query_firmUsername").val();
	var param = {
		//'firmUsrId' :QId,
		'firmNum' : QNum,
		'firmUsername' : QName
	};
	return param;
};


/**
 * 获得增加的参数
 * @return
 */
var getAddParam = function(){
	var addFirmUsrId = $("#addFirmUsrId").val();
	var addFirmNum = $("#addFirmNum").val();
	var addFirmUsername = $("#addFirmUsername").val();
    var addMobile = $("#addMobile").val();
	var addEmail = $("#addEmail").val();
	var addRegisterTime = $("#addRegisterTime").val();
	var addPassword2 = $("#addPassword2").val();
	var addPassword1= $("#addPassword1").val();
	if(addPassword1!=addPassword2){
		util.sysTips("两次输入密码不一致！","addPassword2");
		return ;
	}
	else{
		var param='{'
			param=param+('\"firmUsrId\":\"'+addFirmUsrId+ '\",');
			param=param+('\"firmNum\":\"'+addFirmNum+ '\",');
			param=param+('\"firmUsername\":\"'+addFirmUsername+ '\",');
			param=param+('\"firmPwd\":\"'+$.md5(addPassword2)+ '\",');
			param=param+('\"mobilePhone\":\"'+addMobile+ '\",');
			param=param+('\"email\":\"'+addEmail+ '\",');
			param=param+('\"registerTime\":\"'+addRegisterTime+ '\"');
			
			//param = param.substring(0, param.length - 1);
			param += '}';
			param=str2Json(param);
			return param;
	}
	
};

/**
 * 获得编辑的参数
 * @return
 */
var getEditParam = function(){
	var addFirmUsrId = $("#addFirmUsrId").val();
	var addFirmNum = $("#addFirmNum").val();
	var addFirmUsername = $("#addFirmUsername").val();
    var addMobile = $("#addMobile").val();
	var addEmail = $("#addEmail").val();
	var addRegisterTime = $("#addRegisterTime").val();
	var param='{'
	param=param+('\"firmUsrId\":\"'+addFirmUsrId+ '\",');
	param=param+('\"firmNum\":\"'+addFirmNum+ '\",');
	param=param+('\"firmUsername\":\"'+addFirmUsername+ '\",');
	param=param+('\"mobilePhone\":\"'+addMobile+ '\",');
	param=param+('\"email\":\"'+addEmail+ '\",');
	param=param+('\"registerTime\":\"'+addRegisterTime+ '\"');
	//param = param.substring(0, param.length - 1);
	param += '}';
	param=str2Json(param);
		
	store_new['firmUsrId']=addFirmUsrId;
	store_new['firmNum']=addFirmNum;
	store_new['firmUsername']=addFirmUsername;
	store_new['mobile']=addMobile;
	store_new['email']=addEmail;
	store_new['registerTime']=addRegisterTime;
	return param;
};

/**
 * 编辑回调回填
 * @param data
 * @return
 */
var update_old_data;
var dataFill = function(data){
	var roles=[];
	var object = util.str2Json(data).data;
	update_old_data=object;
	$("#addFirmUsrId").val(object.firmUsrId);
	$("#addFirmNum").val(object.firmNum);
	$("#addFirmUsername").val(object.firmUsername);
    $("#addMobile").val(object.mobilePhone);
	$("#addEmail").val(object.email);
	$("#addRegisterTime").val(object.registerTime);
	
	firmOption_add(object.firmNum);
	
	store_old['firmUsrId']=object.firmUsrId;	
	store_old['firmNum']=object.firmNum;
	store_old['firmUsername']=object.firmUsername;
	store_old['mobile']=object.mobilePhone;
	store_old['email']=object.email;
	store_old['registerTime']=object.registerTime;
};

//重置密码
var rePwdFun = function(btn) {
	util.confirmView(function(){
		var pk = getPk(btn);
		var firmUsrId = pk;
		util.emmAjax({
			url : '../firmUser/resetPassword.action',
			data : {
				'firmUsrId' : firmUsrId
			},
			success : function(data) {
				var obj =str2Json(data);
				if(obj.success=='true')
				{
					util.msg("密码重置成功");
					$("#table").trigger("reloadGrid");
				}
				else{
					util.sysAlert(obj.data);
				}
			}
		});
	},"确定要重置该用户的密码？");
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

function firmOption_add(firmNum) {
	var param=[];
	var selectObj = {};
	selectObj["url"] = firmOptionUrl;
	selectObj["id"] = 'addFirmNum';
	selectObj["param"] = param;
	selectObj["valueParam"] = 'firmNum';
	selectObj["htmlParam"] = 'firmName';
	selectObj["defaultSelectedValue"] = firmNum;
	var selectOption = new SelectOption();
	selectOption.clear('addFirmNum');
	selectOption.loadOption(selectObj);
	

	/*if(firmNum!=null&&firmNum!=""){
		util.emmAjax({
			url : firmOptionUrl,
			type : 'post',
			data : {
				'firmNum' : firmNum
			},
			cache : false,
			dataType : 'text',
			success : function(data) {
				var firmObj = util.str2Json(data).data;
				$("#firmNum").val(firmObj[0].firmNum);
				$("#firmName").val(firmObj[0].firmName);
				
			},
			error : function() {
			}
		});
	}*/
	/*$("#addFirmNum").change(function(){
		var firmNum=$("#addFirmNum").val();
		if(firmNum!=null&&firmNum!=""){
			util.emmAjax({
				url : firmOptionUrl,
				type : 'post',
				data : {
					'firmNum' : firmNum
				},
				cache : false,
				dataType : 'text',
				success : function(data) {
					var firmObj = util.str2Json(data).data;
					$("#firmNum").val(firmObj[0].firmNum);
					$("#firmName").val(firmObj[0].firmName);
					
				},
				error : function() {
				}
			});
		}
		else{
			$("#addFirmNum").val("")
			$("#firmName").val("");
			$("#firmNum").val("");
		}
	}); */
	
};

/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};
