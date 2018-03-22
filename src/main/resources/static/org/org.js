var orgId;
var orgName;
var parentOrgName;
var parentId;
var isRoot=false;
var queryGridUrl = "../org/queryApprovedOrgInfos.action?orgTreeNode.id=";

var addDataUrl = "../org/addOrgInfo.action";
//var addDataUrl = "../approve!addApplication.action"; 
var editDataUrl = "../org/updateOrgInfo.action";

var removeDataUrl = "../org/removeOrgInfo.action";

var querDetialUrl = "../org/queryOrgInfo.action";
var checkUrl = "../org/checkIsRemoveOrg.action";
var nowOperate;
var oldJsonStr;

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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	window.checkForm.openFun().init({path:webPath,form:'addOrEditForm'}); 
	window.checkForm.openFun().init({path:webPath,form:'editForm'}); 
	
	
	loadTree();
	$("#addBtn").click(function(){
		showModel(parentOrgName);
	});
	
	$("#removeOfNumbersBtn").click(function(){
		var checkParam={
			'id':orgId
		};
		
//		var param = getRemoveDataOfNumbersParam(orgId,orgName);
		checkHasBranchOrg(checkParam,function(){
			util.emmAjax({
				url : '../org/queryOrgInfo.action',
				data:{'id':orgId},
				type : 'post',
				success : function(data) {
					var orgObj = util.str2Json(data).data;
					var json ='{"orgId":"'+orgObj.id+'","orgName":"'+orgObj.text+'","orgCode":"'+orgObj.orgCode
							  +'","orgAddr":"'+orgObj.orgAddr+'","orgManager":"'+orgObj.orgManager+'","orgTelephone":"'+orgObj.orgTelephone+'","areaCode":"'+orgObj.areaCode
							  +'","parentOrgName":"'+orgObj.parentOrgName+'"}';

					/*var params={};
					params["approveBean.approveType"] = 'removeOrg';
					params["approveBean.idValue"] = orgObj.id;
					params["approveBean.beanNew"] = json;*/
					
					var param='{';
					param=param+('\"id\":\"'+orgObj.id+'\",');
					
					param = param.substring(0, param.length - 1);
					param += '}';
					param=str2Json(param);
					removeData(param);
				}
			});
		});
	});
	$("#save").click(function(){
		var result=window.checkForm.openFun().onSubmit("editForm");
		//var result=EditOrgCheck();
		if(result){
			var param = getSaveDataOfOrginfoParam(orgId);
			var returnValue=compareStore();
			if(returnValue==0){
				if(param!=null){
					if(param==0){util.sysAlert("父机构不能选择自己！");}
					else{editData(param);}
				}
			}else{
				util.sysAlert("您尚未更改任何内容，申请拒绝！");
			}
		}
	});
	
	$("#addOrEditSaveBtn").click(function(){
		var returnValue=window.checkForm.openFun().onSubmit("addOrEditForm");
		//var result=addOrgCheck();
		if(returnValue){
			var param = getAddParam(parentOrgName);
			if(param!=null){
				addData(param);
			}
		}
	});
	
	$("#upload_form").change(function(){
		$("#importFileShow").html($("#importFile").val());
	});
});

function queryOrgById(id){
	var orgObj=null;
	if(id!="00001"){
		$.ajax({
			url : querDetialUrl,
			data:{'id':id},
			type : 'post',
			async: false,
			cache:false, 
		    dataType:"text",
			success : function(data) {
				orgObj = util.str2Json(data).data;
			}
		});
	}
	return orgObj;
}


var loadTree = function(){
	$("#orgAsyncId").val("");
	var loadOrgTreeBean = new LoadOrgTree();
	var orgSelect_o = function(e,treeId, treeNode){
		oldJsonStr ="";
		var parentOrgCode="";
		var old_parentOrgName ="";
		var parentOrgId="";
		var parentNode =treeNode.getParentNode();
		if(parentNode!=null){
			old_parentOrgName =parentNode.text;
			parentOrgId=treeNode.pId;
			parentId=treeNode.pId;
			parentOrgName=treeNode.text;
			parentOrgCode=treeNode.parentOrgCode;
			isRoot=false;
		}else{
			 var retObj=queryOrgById(treeNode.id);
			 if(retObj!=null){ //支行根节点
				old_parentOrgName =retObj.parentOrgName;
				parentOrgId=retObj.parentId; 
				parentOrgCode=retObj.parentOrgCode;
				parentId=parentOrgId;
				parentOrgName=treeNode.text;
			 }else{  //总行根节点
				 parentId=treeNode.pId;
				 parentOrgName=treeNode.text;
			 }
			 isRoot=true;
		}
		
		oldJsonStr ='{"orgId":"'+treeNode.id+'","parentOrgName":"'+old_parentOrgName+'","parentId":"'+parentOrgId+'","orgName":"'+treeNode.text
			+'","orgCode":"'+treeNode.orgCode+'","orgAddr":"'+treeNode.orgAddr+'","areaCode":"'+treeNode.areaCode+'","orgManager":"'
			+treeNode.orgManager+'","orgTelephone":"'+treeNode.orgTelephone+'","orgPath":"'+treeNode.orgPath+'"}';
		$("#opbutton").show();
		$("#orginfodata").show();
		$("#orgsuper").show();
		orgId=treeNode.id;
		orgName=treeNode.text;
		
		$('span[id="errormsg"]').remove();
		$('#updatesuperorgCOde').attr("disabled",true);
		$("#updateorgCode").attr("disabled",true);
		$("#updateorgAddress").attr("disabled",true);
		$("#updateorgContacts").attr("disabled",true);
		$("#updateorgPhoneNumber").attr("disabled",true);
		$("#updateAreaCode").attr("disabled",true);
		$("#updateorgName").attr("disabled",true);
		$('#updatesuperorgCOde').attr("parentOrgPath","");
		$('#updatesuperorgCOde').attr("parentOrgId","");
		$('#updatesuperorgCOde').attr("parentOrgName","");
		$("#save").attr("disabled",true);
		$("#updateorgName").val(treeNode.text);
		$("#updateorgCode").val(treeNode.orgCode);
		$("#updateorgContacts").val(treeNode.orgManager);
		$("#updateorgPhoneNumber").val(treeNode.orgTelephone);
		$("#updateorgAddress").val(treeNode.orgAddr);
		$("#updateAreaCode").val(treeNode.areaCode);
		if(treeNode.getParentNode()!=null){
			$("#updatesuperorgCOde").val(treeNode.getParentNode().orgCode);
		}
		else{
			$("#updatesuperorgCOde").val(parentOrgCode);
			} 
		$("#updatesuperorgCOde").addClass("updatesuperorgCOde");

		var parentNode=treeNode.getParentNode();
		if(parentNode!=null){
			store_old['parentOrgCode']=parentNode.orgCode;
		}else{
			store_old['parentOrgCode']="";
		}
		store_old['orgName']=treeNode.text;
		store_old['orgCode']=treeNode.orgCode;
		store_old['areaCode']=treeNode.areaCode;
		store_old['orgManager']=treeNode.orgManager;
		store_old['mobilePhone']=treeNode.orgTelephone;
		store_old['address']=treeNode.orgAddr;
	};
	
	loadOrgTreeBean.loadOrgTree("treeDemo", orgSelect_o,"orgAsyncId");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("orgCode");
	headParam.push("text");
	headParam.push("orgAddr");
	headParam.push("orgManager");
	headParam.push("orgTelephone");
	var url = queryGridUrl+OrgId;
	
	var defaultBtns = {"viewBtn":"hide","editBtn":"show","removeBtn":"show"};
	var operateBtns = [];
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "id";
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
var  showModel = function(parentOrgName){
	resetAddOrEditForm();
	$("#addOrEditModal").modal("show");
	$('#parentOrgName_input').val(parentOrgName);
	//adddblurOrgCheck();
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
	//clearAddOrEidtUser();
};

/**
 * 新增或修改成功之后的事件
 * @return
 */
var addOrEditCompleteFun = function(){
	hideModel();
//	$('span[id="errormsg"]').remove();
	//clearAddOrEidtUser();
	loadTree();
	$('#updatesuperorgCOde').attr("disabled",true);
	$("#updatesuperorgCOde").addClass("updatesuperorgCOde");
	$("#updateorgCode").attr("disabled",true);
	$("#updateorgAddress").attr("disabled",true);
	$("#updateorgContacts").attr("disabled",true);
	$("#updateorgPhoneNumber").attr("disabled",true);
	$("#updateAreaCode").attr("disabled",true);
	$("#updateorgName").attr("disabled",true);
	$("#save").attr("disabled",true);
	$('#updatesuperorgCOde').attr("parentOrgPath","");
	$('#updatesuperorgCOde').attr("parentOrgId","");
	$('#updatesuperorgCOde').attr("parentOrgName","");
//	LoadOrgTree();
//	window.location.reload();//刷新当前页面.
};


/**
 * 新增
 * @return
 */
var addData = function(param){
	operateUtil.addData(addDataUrl,param,addOrEditCompleteFun);
};
/**
 * 校验删除机构是否有子机构
 * @return
 */
var checkHasBranchOrg = function(param,checkSuccessFun){
	operateUtil.viewData(checkUrl,param,checkSuccessFun);
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
//	LoadOrgTree();
};

/**
 * 删除
 */
var removeData = function(param){
	operateUtil.removeData(removeDataUrl,param,addOrEditCompleteFun);
};


/**
 * 获得批量删除的参数
 * @return
 */
var getRemoveDataOfNumbersParam = function(orgId,orgName){
	var param={
		'approveBean.approveType':"removeOrg",
		'approveBean.beanNew':'{"orgId":"'+orgId+'","orgName":"'+orgName+'"}',
		'approveBean.idValue':orgId
	};
	return param;
};


/**
 * 详情
 */
var viewBtn = function(){
	
};

/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var En = $("#query_En").val();
	var Cn = $("#query_Cn").val();
	var param = {
		'devClassBean.devClassEn' : En,
		'devClassBean.devClassCn' : Cn
	};
	return param;
};

/**
 * 获得增加的参数
 * @return
 */
var getAddParam = function(){
	
	var addorgName = $("#addorgName").val();
	var addorgCode = $("#addorgCode").val();
	var addorgAddress = jQuery.trim($("#addorgAddress").val());
	var addorgContacts = $("#addorgContacts").val();
	var addorgPhoneNumber = $("#addorgPhoneNumber").val();
	var addAreaCode = $("#addAreaCode").val();
	var json ='{"orgId":"","parentOrgName":"'+parentOrgName+'","parentId":"'+orgId+'","orgName":"'+addorgName+'","orgCode":"'+addorgCode+'","orgAddr":"'+
	addorgAddress+'","orgManager":"'+addorgContacts+'","areaCode":"'+addAreaCode+'","orgTelephone":"'+addorgPhoneNumber+'"}';
	/*var param = {
			'approveBean.beanNew':json,
			'approveBean.approveType':'addOrg'	
		};*/
	var param='{';
	param=param+('\"id\":\"\",');
	param=param+('\"parentOrgName\":\"'+parentOrgName+ '\",');
	param=param+('\"parentId\":\"'+orgId+ '\",');
	param=param+('\"text\":\"'+addorgName+ '\",');
	param=param+('\"orgCode\":\"'+addorgCode+ '\",');
	param=param+('\"areaCode\":\"'+addAreaCode+ '\",');
	param=param+('\"orgAddr\":\"'+addorgAddress+ '\",');
	param=param+('\"orgManager\":\"'+addorgContacts+ '\",');
	param=param+('\"orgTelephone\":\"'+addorgPhoneNumber+ '\",');
	//param=param+('\"orgPath\":\"'+orgPath+ '\",');
	param = param.substring(0, param.length - 1);
	param += '}';
	param=str2Json(param);
	return param;
};
/**
 * 编辑回调回填
 * @param data
 * @return
 */
var dataFill = function(data){
	var object = util.str2Json(data).data;
	$("#orgName").val(object.text);
	$("#orgCode").val(object.orgCode);
	$("#orgAddress").val(object.orgAddr);
	$("#orgContacts").val(object.orgManager);
	$("#orgPhoneNumber").val(object.orgTelephone);
};


function editOrg() {
	if(isRoot==false){
		$('#updatesuperorgCOde').removeAttr("disabled");
		$("#updatesuperorgCOde").removeClass("updatesuperorgCOde");
	}
	$('#updateorgName').removeAttr("disabled");
	$('#updateorgCode').removeAttr("disabled");
	$('#updateorgAddress').removeAttr("disabled");
	$('#updateorgContacts').removeAttr("disabled");
	$('#updateorgPhoneNumber').removeAttr("disabled");
	$('#updateAreaCode').removeAttr("disabled");
	$('#save').removeAttr("disabled");
}

var getSaveDataOfOrginfoParam = function(orgId){
	var parentOrgCode = $("#updatesuperorgCOde").val();
	var parentOrgPath = $("#updatesuperorgCOde").attr("parentOrgPath");
	var parentOrgId = $("#updatesuperorgCOde").attr("parentOrgId");
	var updateParentOrgName = $("#updatesuperorgCOde").attr("parentOrgName");
	var updateorgName = $("#updateorgName").val();
	var updateorgCode = $("#updateorgCode").val();
	var updateorgAddress = jQuery.trim($("#updateorgAddress").val());
	var updateorgContacts = $("#updateorgContacts").val();
	var updateorgPhoneNumber = $("#updateorgPhoneNumber").val();
	var updateAreaCode = $("#updateAreaCode").val();
	var orgPath=parentOrgPath+orgId;
	var oldOrg = util.str2Json(oldJsonStr);
	//更新时保持原来的父机构详情
	if(parentOrgPath==""&&parentOrgId==""){
		parentOrgId =oldOrg.parentId;
		orgPath =oldOrg.orgPath;
	} 
	
	var oldJson = util.str2Json(oldJsonStr);
	if(updateParentOrgName==""){
		updateParentOrgName = oldJson.parentOrgName;
	};
	
	if(parentOrgId == ""){
		newJsonStr ='{"orgId":"'+orgId+'","parentOrgName":"'+updateParentOrgName+'","orgName":"'+updateorgName
		+'","orgCode":"'+updateorgCode+'","areaCode":"'+updateAreaCode+'","orgAddr":"'+updateorgAddress+'","orgManager":"'
		+updateorgContacts+'","orgTelephone":"'+updateorgPhoneNumber+'","orgPath":"'+orgPath+'"}';
	}else{
		newJsonStr ='{"orgId":"'+orgId+'","parentOrgName":"'+updateParentOrgName+'","parentId":"'+parentOrgId+'","orgName":"'+updateorgName
		+'","orgCode":"'+updateorgCode+'","areaCode":"'+updateAreaCode+'","orgAddr":"'+updateorgAddress+'","orgManager":"'
		+updateorgContacts+'","orgTelephone":"'+updateorgPhoneNumber+'","orgPath":"'+orgPath+'"}';
	}
	
	/*var param ={
			'approveBean.beanOld':oldJsonStr,
			'approveBean.approveType':'updateOrg',
			'approveBean.beanNew':newJsonStr,
			'approveBean.idValue' : orgId
		};*/
	var param='{';
	param=param+('\"id\":\"'+orgId+ '\",');
	param=param+('\"parentOrgName\":\"'+updateParentOrgName+ '\",');
	param=param+('\"parentId\":\"'+parentOrgId+ '\",');
	param=param+('\"text\":\"'+updateorgName+ '\",');
	param=param+('\"orgCode\":\"'+updateorgCode+ '\",');
	param=param+('\"areaCode\":\"'+updateAreaCode+ '\",');
	param=param+('\"orgAddr\":\"'+updateorgAddress+ '\",');
	param=param+('\"orgManager\":\"'+updateorgContacts+ '\",');
	param=param+('\"orgTelephone\":\"'+updateorgPhoneNumber+ '\",');
	param=param+('\"orgPath\":\"'+orgPath+ '\",');
	param = param.substring(0, param.length - 1);
	param += '}';
	param=str2Json(param);
	
	store_new['parentOrgCode']=$("#updatesuperorgCOde").val();
	store_new['orgName']=updateorgName;
	store_new['orgCode']=updateorgCode;
	store_new['areaCode']=updateAreaCode;
	store_new['orgManager']=updateorgContacts;
	store_new['mobilePhone']=updateorgPhoneNumber;
	store_new['address']=updateorgAddress;
	
	if(parentOrgId==orgId){
		return 0;
	}else{
		return param;
	}
	
};

var downloadOrgModel=function(){
	window.location.href ="../importData!downloadOrgModel.action";
};

var checkFileUploadForm = function(){
	var filePath=$("#importFile").val();
	if(filePath==null||filePath==""){
		util.sysAlert("上传文件不能为空！");
		return false;
	}
	
	if((filePath.endWith(".xls")||filePath.endWith(".xlsx"))){
		
	}else{
		util.sysAlert("上传文件格式不正确！");
		return false;
	}
	util.loading();
	return true;
};

function show(msg){
	util.closeLoading();
	var dataMsg = util.str2Json(msg).data;
	var exportStatus=util.str2Json(msg).success;
	if(exportStatus=="success"){
		$("#close").click();
	}
	else{
		$("#importFile").val("");
	}
	$("#importFileShow").html("");
	$("#importFile").val("");
	util.msg(dataMsg);
};

/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};