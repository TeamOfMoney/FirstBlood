var util = new NT.utilObj.util();
var loginUserName;
var orgCode;
var orgPath;
var orgName;
var orgId;
/*
 * 用户列表显示
 */
var queryGridUrl = "../loanApp/findByCondition.action";

var addDataUrl = "../loanApp/addApplication.action";
var editDataUrl = "../firm/updateFirm.action";
var removeDataUrl = "../firm/delFirm.action";

/*
 *查询用户资料 
 */
var querDetialUrl = "../loanApp/findById.action";

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
	headParam.push("id");
	headParam.push("loanId");
	headParam.push("processName");
	headParam.push("processFlag");
	headParam.push("processResult");
	headParam.push("processUser");
	headParam.push("processStatus");
	headParam.push("initTime");
	headParam.push("finishTime");
	
	var url = queryGridUrl;
	
	var defaultBtns = {"viewBtn":"show","editBtn":"show","removeBtn":"hidden"};
	var operateBtns = [];
	
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "id";
	gridObj["loanId"] = "loanId";
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
 * 获得loanId
 */
var getLoanId = function(btn){
	var loanId = $(btn).parent().parent().parent().attr("loanId");
	return loanId;
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
	
	//隐藏备注框
	/*$("#syfRe").hide();
	$("#xfkdRe").hide();
	$("#jydkRe").hide();
	$("#nhxexydkRe").hide();
	$("#esfajRe").hide();*/
	
	//
	//$("input[name='businessTypes']").attr("checked",false);
	//$("input[name='businessTypes']").removeAttr("checked");
	
	
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
		data:{'firmNum':pk},
		type : 'post',
		success : function(data) {
			var obj = util.str2Json(data);
			var firmObj=obj.data;
			if(obj.success=='true')
				{
					var param='{'
						param=param+('\"firmNum\":\"'+firmObj.firmNum+ '\",');
						param=param+('\"firmName\":\"'+firmObj.firmName+ '\",');
						param=param+('\"contact\":\"'+firmObj.firmContact+ '\",');
						param=param+('\"telephone\":\"'+firmObj.telephone+ '\",');
						param=param+('\"mobilePhone\":\"'+firmObj.mobilePhone+ '\",');
						param=param+('\"fax\":\"'+firmObj.fax+ '\",');
						param=param+('\"email\":\"'+firmObj.email+ '\",');
						param=param+('\"address\":\"'+firmObj.address+ '\",');
						param=param+('\"firmDate\":\"'+firmObj.firmDate+ '\",');
						param=param+('\"remark\":\"'+firmObj.remark+ '\"');
					
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
	var param = {"loanId":pk};
	viewData(param,dataFill);
};

/**
 * 编辑
 */
var editBtn = function(btn){
	var pk = getPk(btn);
	nowOperate = "edit";
	$("#action").html('贷款申请补件');
	showModel();
	//$("#addFirmNum").attr("disabled",true);
	editDataFill(pk);
	
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	window.checkForm.openFun().init({path:webPath,form:'addOrEditForm'}); 
	loadLoginUserInfo();
	
	$("#addFirmDate").val(GetDateStr(-30));
	$("#addFirmDate").datetimepicker({
		format: "yyyy-mm-dd",
		autoclose:true,
		minView:2,
		language:'cn'
	});
	
	$("#addBtn").click(function(){
		nowOperate = "add";
		$("#addFirmNum").attr("disabled",false);
		$("#action").html('新增贷款申请');
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
	//loadData();	
	$('input:radio[name="businessTypes"]').change( function(){
		var item = $("input[name='businessTypes']:checked").val();
		//切换时清除备注内容
		//alert(item);
		$("#addSyfRemark1").val(0);
		$("#addSyfRemark2").val("");
		$("#addXfdkRemark").val(0);
		$("#addJydkRemark1").val(0);
		$("#addJydkRemark2").val("");
		$("#addNhxexydkRemark").val(0);
		$("#addEsfajRemark").val(0);
		if(item=='1')
		{
			$("#syfRe").show();
			$("#xfkdRe").hide();
			$("#jydkRe").hide();
			$("#nhxexydkRe").hide();
			$("#esfajRe").hide();
		}
		else if(item=='2')
		{
			$("#syfRe").hide();
			$("#xfkdRe").show();
			$("#jydkRe").hide();
			$("#nhxexydkRe").hide();
			$("#esfajRe").hide();
		
		}else if(item=='3')
		{
			$("#syfRe").hide();
			$("#xfkdRe").hide();
			$("#jydkRe").show();
			$("#nhxexydkRe").hide();
			$("#esfajRe").hide();
		
		}else if(item=='4')
		{
			$("#syfRe").hide();
			$("#xfkdRe").hide();
			$("#jydkRe").hide();
			$("#nhxexydkRe").show();
			$("#esfajRe").hide();
		
		}else if(item=='5')
		{
			$("#syfRe").hide();
			$("#xfkdRe").hide();
			$("#jydkRe").hide();
			$("#nhxexydkRe").hide();
			$("#esfajRe").show();
		
		}
	});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadLoginUserInfo() {
	var util = new NT.utilObj.util();
	util.emmAjax({
		url : '../login/getLoginUserInfo.action',
		success : function(data) {
			var obj = eval('(' + data + ')');
			loginUserName = obj.data.userName;
			orgCode = obj.data.orgCode;
			orgPath = obj.data.orgPath;
			orgName = obj.data.orgName;
			orgId = obj.data.orgId;
			
		}
	});
};


/**
 * 详情
 */
var viewBtn = function(btn){
	var loanId = getLoanId(btn);
	var url = "./detailsLoanAppRecommit.html?loanId=" + loanId;
	window.location.href = encodeURI(url);
};


/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var QNum = $("#query_loanId").val();
	//var loginUserName = $("#query_firmName").val(); 
	var param = {
		'loanId' : QNum,
		'precessUser' : loginUserName,
		'precessName' :'补件',
		'precessStatus' :'0'
	};
	return param;
};


/**
 * 获得增加的参数
 * @return
 */
var getAddParam = function(){
	var addBorrowerName = $("#addBorrowerName").val();
	var addSpouseName = $("#addSpouseName").val();
	var addSex = $("#addSex").val();
    var addCredentialNo = $("#addCredentialNo").val();
    //var addBusinessTypes = $("#addBusinessTypes").val();
	var addBusinessTypes = $("input[name='businessTypes']:checked").val();
	var addAmount = $("#addAmount").val();
	var addTerm = $("#addTerm").val();
	var addGuaranteeMethod = $("input[name='guaranteeMethod']:checked").val();
	var addIsRenew = $("input[name='isRenew']:checked").val();
	var addMarketer = $("#addMarketer").val();
	var addMarketerPost = $("#addMarketerPost").val();
	var addOperator = $("#addOperator").val();
	var addOperatorPost = $("#addOperatorPost").val();
	var addSyfRemark1;
	var addSyfRemark2;
	var addXfdkRemark;
	var addJydkRemark1;
	var addJydkRemark2;
	var addNhxexydkRemark;
	var addEsfajRemark;
	if(addBusinessTypes=='1')
	{
		addSyfRemark1 = $("#addSyfRemark1").val();
		addSyfRemark2 = $("#addSyfRemark2").val();
	}
	else if(addBusinessTypes=='2')
	{
		addXfdkRemark=$("#addXfdkRemark").val();
	
	}else if(addBusinessTypes=='3')
	{
		addXfdkRemark=$("#addJydkRemark1").val();
		addXfdkRemark=$("#addJydkRemark2").val();
	
	}else if(addBusinessTypes=='4')
	{
		addXfdkRemark=$("#addNhxexydkRemark").val();
	
	}else if(addBusinessTypes=='5')
	{
		addXfdkRemark=$("#addEsfajRemark").val();
	}
	//参数需要传递到loanBean的loanInfo中
	var param='{';
	param=param+('\"operator\":\"'+loginUserName+ '\",');
	param=param+('\"orgId\":\"'+orgId+ '\",');
	param=param+('\"orgName\":\"'+orgName+ '\",');
	param=param+('\"orgCode\":\"'+orgCode+ '\",');
	param=param+('{\"loanInfo\":[{');
	param=param+('\"borrowerName\":\"'+addBorrowerName+ '\",');
	param=param+('\"spouseName\":\"'+addSpouseName+ '\",');
	param=param+('\"sex\":\"'+addSex+ '\",');
	param=param+('\"credentialNo\":\"'+addCredentialNo+ '\",');
	param=param+('\"businessTypes\":\"'+addBusinessTypes+ '\",');
	if(addBusinessTypes=='1')
	{
		param=param+('\"syfRemark1\":\"'+addSyfRemark1+ '\",');
		param=param+('\"syfRemark2\":\"'+addSyfRemark2+ '\",');
	}
	else if(addBusinessTypes=='2')
	{
		param=param+('\"xfdkRemark\":\"'+addXfdkRemark+ '\",');
	
	}else if(addBusinessTypes=='3')
	{
		param=param+('\"jydkRemark1\":\"'+addJydkRemark1+ '\",');
		param=param+('\"jydkRemark2\":\"'+addJydkRemark2+ '\",');
	
	}else if(addBusinessTypes=='4')
	{
		param=param+('\"nhxexydkRemark\":\"'+addNhxexydkRemark+ '\",');
	
	}else if(addBusinessTypes=='5')
	{
		param=param+('\"esfajRemark\":\"'+addEsfajRemark+ '\",');
	}
	param=param+('\"amount\":\"'+addAmount+ '\",');
	param=param+('\"term\":\"'+addTerm+ '\",');
	param=param+('\"guaranteeMethod\":\"'+addGuaranteeMethod+ '\",');
	param=param+('\"isRenew\":\"'+addIsRenew+ '\",');
	param=param+('\"marketer\":\"'+addMarketer+ '\",');
	param=param+('\"marketerPost\":\"'+addMarketerPost+ '\",');
	param=param+('\"operator\":\"'+addOperator+ '\",');
	param=param+('\"operatorPost\":\"'+addOperatorPost+ '\"}]');
	//param = param.substring(0, param.length - 1);
	param += '}';
	param=str2Json(param);
	return param;
};

/**
 * 获得编辑的参数
 * @return
 */
var getEditParam = function(){
	var addBorrowerName = $("#addBorrowerName").val();
	var addSpouseName = $("#addSpouseName").val();
	var addSex = $("#addSex").val();
    var addCredentialNo = $("#addCredentialNo").val();
    //var addBusinessTypes = $("#addBusinessTypes").val();
	var addBusinessTypes = $("input[name='businessTypes']:checked").val();
	var addAmount = $("#addAmount").val();
	var addTerm = $("#addTerm").val();
	var addGuaranteeMethod = $("input[name='guaranteeMethod']:checked").val();
	var addIsRenew = $("input[name='isRenew']:checked").val();
	var addMarketer = $("#addMarketer").val();
	var addMarketerPost = $("#addMarketerPost").val();
	var addOperator = $("#addOperator").val();
	var addOperatorPost = $("#addOperatorPost").val();
	var addSyfRemark1;
	var addSyfRemark2;
	var addXfdkRemark;
	var addJydkRemark1;
	var addJydkRemark2;
	var addNhxexydkRemark;
	var addEsfajRemark;
	if(addBusinessTypes=='1')
	{
		addSyfRemark1 = $("#addSyfRemark1").val();
		addSyfRemark2 = $("#addSyfRemark2").val();
	}
	else if(addBusinessTypes=='2')
	{
		addXfdkRemark=$("#addXfdkRemark").val();
	
	}else if(addBusinessTypes=='3')
	{
		addXfdkRemark=$("#addJydkRemark1").val();
		addXfdkRemark=$("#addJydkRemark2").val();
	
	}else if(addBusinessTypes=='4')
	{
		addXfdkRemark=$("#addNhxexydkRemark").val();
	
	}else if(addBusinessTypes=='5')
	{
		addXfdkRemark=$("#addEsfajRemark").val();
	}
	//参数需要传递到loanBean的loanInfo中
	var param='{';
	param=param+('\"operator\":\"'+loginUserName+ '\",');
	param=param+('\"orgId\":\"'+orgId+ '\",');
	param=param+('\"orgName\":\"'+orgName+ '\",');
	param=param+('\"orgCode\":\"'+orgCode+ '\",');
	param=param+('{\"loanInfo\":[{');
	param=param+('\"borrowerName\":\"'+addBorrowerName+ '\",');
	param=param+('\"spouseName\":\"'+addSpouseName+ '\",');
	param=param+('\"sex\":\"'+addSex+ '\",');
	param=param+('\"credentialNo\":\"'+addCredentialNo+ '\",');
	param=param+('\"businessTypes\":\"'+addBusinessTypes+ '\",');
	if(addBusinessTypes=='1')
	{
		param=param+('\"syfRemark1\":\"'+addSyfRemark1+ '\",');
		param=param+('\"syfRemark2\":\"'+addSyfRemark2+ '\",');
	}
	else if(addBusinessTypes=='2')
	{
		addXfdkRemark=$("#addXfdkRemark").val();
		param=param+('\"xfdkRemark\":\"'+addXfdkRemark+ '\",');
	
	}else if(addBusinessTypes=='3')
	{
		param=param+('\"jydkRemark1\":\"'+addJydkRemark1+ '\",');
		param=param+('\"jydkRemark2\":\"'+addJydkRemark2+ '\",');
	
	}else if(addBusinessTypes=='4')
	{
		param=param+('\"nhxexydkRemark\":\"'+addNhxexydkRemark+ '\",');
	
	}else if(addBusinessTypes=='5')
	{
		param=param+('\"esfajRemark\":\"'+addEsfajRemark+ '\",');
	}
	param=param+('\"amount\":\"'+addAmount+ '\",');
	param=param+('\"term\":\"'+addTerm+ '\",');
	param=param+('\"guaranteeMethod\":\"'+addGuaranteeMethod+ '\",');
	param=param+('\"isRenew\":\"'+addIsRenew+ '\",');
	param=param+('\"marketer\":\"'+addMarketer+ '\",');
	param=param+('\"marketerPost\":\"'+addMarketerPost+ '\",');
	param=param+('\"operator\":\"'+addOperator+ '\",');
	param=param+('\"operatorPost\":\"'+addOperatorPost+ '\"}]');
	//param = param.substring(0, param.length - 1);
	param += '}';
	param=str2Json(param);
				
	store_new['borrowerName']=addBorrowerName;
	store_new['spouseName']=addSpouseName;
	store_new['sex']=addSex;
	store_new['credentialNo']=addCredentialNo;
	store_new['businessType']=addBusinessTypes;
	store_new['syfRemark1']=addSyfRemark1;
	store_new['syfRemark2']=addSyfRemark2;
	store_new['xfdkRemark']=addXfdkRemark;
	store_new['jydkRemark1']=addJydkRemark1;
	store_new['jydkRemark2']=addJydkRemark2;
	store_new['nhxexydkRemark']=addNhxexydkRemark;
	store_new['esfajRemark']=addEsfajRemark;
	store_new['amount']=addAmount;
	store_new['term']=addTerm;
	store_new['guaranteeMethod']=addGuaranteeMethod;
	store_new['isRenew']=addIsRenew;
	store_new['marketer']=addMarketer;
	store_new['marketerPost']=addMarketerPost;
	store_new['operator']=addOperator;
	store_new['operatorPost']=addOperatorPost;
	return param;
};

/**
 * 编辑回调回填
 * @param data
 * @return
 */
var update_old_data;
var dataFill = function(data){
	
	var object = util.str2Json(data).data.loanInfo;
	update_old_data=object;
	
	$("#addBorrowerName").val(object.borrowerName);
	$("#addSpouseName").val(object.spouseName);
	$("#addSex").val(object.sex);
    $("#addCredentialNo").val(object.credentialNo);
    $("#addBusinessTypes").val(object.businessType);
    var businessTypeValue = object.businessType
    //$('input[type="radio"]:checked').parent('label').addClass('active');
   // $('input[name="addBusinessTypes"]:checked').parent('label').addClass('active');
    $("input[name='addBusinessTypes']").each(function(i){  
        if($(this).val()==businessTypeValue)  
        {  
            $(this).parent('label').addClass('active');  
        }  
    });
    if(businessTypeValue=='1')
	{
    	$("#syfRe").show();
		$("#xfkdRe").hide();
		$("#jydkRe").hide();
		$("#nhxexydkRe").hide();
		$("#esfajRe").hide();
		$("#addSyfRemark1").val(object.syfRemark1);
		$("#addSyfRemark2").val(object.syfRemark2);
	}
	else if(businessTypeValue=='2')
	{
		$("#syfRe").hide();
		$("#xfkdRe").show();
		$("#jydkRe").hide();
		$("#nhxexydkRe").hide();
		$("#esfajRe").hide();
		$("#addXfdkRemark").val(object.xfdkRemark);
	
	}else if(businessTypeValue=='3')
	{
		$("#syfRe").hide();
		$("#xfkdRe").hide();
		$("#jydkRe").show();
		$("#nhxexydkRe").hide();
		$("#esfajRe").hide();
		$("#addJydkRemark1").val(object.jydkRemark1);
		$("#addJydkRemark2").val(object.jydkRemark2);
	
	}else if(businessTypeValue=='4')
	{
		$("#syfRe").hide();
		$("#xfkdRe").hide();
		$("#jydkRe").hide();
		$("#nhxexydkRe").show();
		$("#esfajRe").hide();
		$("#addNhxexydkRemark").val(object.nhxexydkRemark);
	
	}else if(businessTypeValue=='5')
	{
		$("#syfRe").hide();
		$("#xfkdRe").hide();
		$("#jydkRe").hide();
		$("#nhxexydkRe").hide();
		$("#esfajRe").show();
		$("#addEsfajRemark").val(object.esfajRemark);
	}
    
    
    $("#addAmount").val(object.amount);
	$("#addTerm").val(object.term);
	//$("#addGuaranteeMethod").val(object.guaranteeMethod);
	$("input[name='guaranteeMethod']").each(function(i){  
        if($(this).val()==object.guaranteeMethod)  
        {  
            $(this).parent('label').addClass('active');  
        }  
    });
	//$("#addIsRenew").val(object.isRenew);
	$("input[name='isRenew']").each(function(i){  
        if($(this).val()==object.isRenew)  
        {  
            $(this).parent('label').addClass('active');  
        }  
    });
	$("#addMarketer").val(object.marketer);
	$("#addMarketerPost").val(object.marketerPost);
	$("#addOperator").val(object.operator);
	$("#addOperatorPost").val(object.operatorPost);
	
	store_old['borrowerName']=object.borrowerName;
	store_old['spouseName']=object.spouseName;
	store_old['sex']=object.sex;
	store_old['credentialNo']=object.credentialNo;
	store_old['businessType']=object.businessType;
	store_old['syfRemark1']=object.syfRemark1;
	store_old['syfRemark2']=object.syfRemark2;
	store_old['xfdkRemark']=object.xfdkRemark;
	store_old['jydkRemark1']=object.jydkRemark1;
	store_old['jydkRemark2']=object.jydkRemark2;
	store_old['nhxexydkRemark']=object.nhxexydkRemark;
	store_old['esfajRemark']=object.esfajRemark;
	store_old['amount']=object.amount;
	store_old['term']=object.term;
	store_old['guaranteeMethod']=object.guaranteeMethod;
	store_old['isRenew']=object.isRenew;
	store_old['marketer']=object.marketer;
	store_old['marketerPost']=object.marketerPost;
	store_old['operator']=object.operator;
	store_old['operatorPost']=object.operatorPost;
};


/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};
