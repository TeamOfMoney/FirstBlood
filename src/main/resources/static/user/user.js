var util = new NT.utilObj.util();

var loginUserName;
/*
 * 用户列表显示
 */
var queryGridUrl = "../user/findByCondition.action";

var addDataUrl = "../user/addUser.action";
var editDataUrl = "../user/updateUser.action";
var removeDataUrl = "../user/delUser.action";

/*
 *查询用户资料 
 */
var querDetialUrl = "../user/findById.action";

var nowOperate;

var store_old={};
var store_new={};
function compareStore(){
	var returnValue=1;
	$.each(store_new,function(key,ele){
			if(key=='roles'){
				store_new['roles']=sortArr(store_new['roles']);
				store_old['roles']=sortArr(store_old['roles']);
				if(store_new['roles'].length==store_old['roles'].length){
					for(var i=0;i<store_new['roles'].length;i++){
						if(store_old['roles'][i]!=store_new['roles'][i]){
							returnValue=0;
						}
					}
				}else{
					returnValue=0;
				}
			}else{
				var valueOld=store_old[key];
				if(ele!=valueOld){
					returnValue=0;
				}
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
	headParam.push("orgName");
	headParam.push("userName");
	headParam.push("realName");
	/*headParam.push("roleNames");*/
	headParam.push("sex");
	headParam.push("mobilePhone");
	headParam.push("email");
	headParam.push("userType");
	headParam.push("registerTime");
	
	var url = queryGridUrl;
	
	var defaultBtns = {"viewBtn":"show","editBtn":"show","removeBtn":"show"};
	var operateBtns = [];
	var pushBtn = {'btnName':'pushBtn','text':'<button class="btn btn-sm btn-success" onclick="rePwdFun(this)" title="密码重置">' +
			' <i class="glyphicon glyphicon-repeat"></i>' +
			'</button>'};
	operateBtns.push(pushBtn);
	
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "userName";
	gridObj["page"] = true;
	gridObj["checked"]=false;
	var userTypeFormat = function(val){
		if(val=="1"){
			return "客户经理";
		}
		else if(val=="2"){
			return "申请分配";
		}
		else if(val=="3"){
			return "审核";
		}
		else if(val=="4"){
			return "二审人员";
		}
		else {
			return val;
		}
	};
	
	var headFormat = {"userType":userTypeFormat};
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
	if(pk==loginUserName){
		util.sysAlert("您不能删除自己的信息！");
	}
	else{
		util.emmAjax({
			url : '../role/isExitRoleByCreator.action',
			data:{'roleCreator':pk},
			type : 'post',
			success : function(data) {
				var obj = util.str2Json(data); 
				if(obj.success=='true')
					{
						util.emmAjax({
							url : querDetialUrl,
							data:{'userName':pk},
							type : 'post',
							success : function(data) {
								var obj = util.str2Json(data);
								var userObj=obj.data;
								if(obj.success=='true')
									{
										var param='{'
											param=param+('\"realName\":\"'+userObj.realName+ '\",');
											param=param+('\"userName\":\"'+userObj.userName+ '\",');
											//param=param+('\"pwd\":\"'+$.md5(addPassword2)+ '\",');
											param=param+('\"mobilePhone\":\"'+userObj.mobilePhone+ '\",');
											//param=param+('\"email\":\"'+email+ '\",');
											
											/*var index=0;
											for(var i=0;i<array.length;i++){
												param=param+('\"roleInfos['+index+'].roleId\":\"'+array[i]+ '\",');
												param=param+('\"roleInfos['+index+'].roleName\":\"'+arrayRoleName[i]+ '\",');
												index++;
											}
											param = param.substring(0, param.length - 1);*/
											param += '}';
											param=str2Json(param);
										removeData(param);
									}
								else{
									util.sysAlert(obj.data);
								}
								
							}
						});
					}else 
					{
						util.sysAlert(obj.data);
					}
				
			}
		});
	}
};



/**
 * 编辑回填
 */
var editDataFill=function(pk){
	var param = {"userName":pk};
	viewData(param,dataFill);
};

/**
 * 编辑
 */
var editBtn = function(btn){
	var pk = getPk(btn);
	if(pk==loginUserName){
		util.sysAlert("您不能修改自己的信息！");
	}
	else{
		nowOperate = "edit";
		$("#action").html('编辑系统用户');
		showModel();
		$("#addUserName").attr("disabled",true);
		$("#passw1").hide();
		$("#passw2").hide();
		editDataFill(pk);
	}
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	window.checkForm.openFun().init({path:webPath,form:'addOrEditForm'}); 
	
	//loadRole_query();
	loadLoginUserInfo();
	
	$("#addBtn").click(function(){
		nowOperate = "add";
		$("#addUserName").attr("disabled",false);
		$("#passw1").show();
		$("#passw2").show();
		$("#action").html('新增系统用户');
		showModel();
		$("#multiselect_to").find("option").remove();
		queryRole();
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
	loadData();	
	$("#rightSelected").click(function(){
		$("#multiselect").find("option:checked").each(function(){
			$(this).remove();
			var optionHtml = '<option value="'+$(this).val()+'">'+$(this).html()+'</option>';
			$("#multiselect_to").append(optionHtml);
		});
		
	});
	
	$("#leftSelected").click(function(){
		$("#multiselect_to").find("option:checked").each(function(){
			$(this).remove();
			var optionHtml = '<option value="'+$(this).val()+'">'+$(this).html()+'</option>';
			$("#multiselect").append(optionHtml);
		});
		
	});
	
	$("#rightAll").click(function(){
		$("#multiselect").find("option").each(function(){
			$(this).remove();
			var optionHtml = '<option value="'+$(this).val()+'">'+$(this).html()+'</option>';
			$("#multiselect_to").append(optionHtml);
		});
		
	});
	
	$("#leftAll").click(function(){
		$("#multiselect_to").find("option").each(function(){
			$(this).remove();
			var optionHtml = '<option value="'+$(this).val()+'">'+$(this).html()+'</option>';
			$("#multiselect").append(optionHtml);
		});
		
	});
	
	$("#resetQueryFormInfo").click(function(){
		var form = $("#queryGridForm");
		form[0].reset();
		$("#queryOrgPath").val("");
	});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 *获取登录用户名
 */
function loadLoginUserInfo() {
	var util = new NT.utilObj.util();
	util.emmAjax({
		url : '../login/getLoginUserInfo.action',
		success : function(data) {
			var obj = eval('(' + data + ')');
			loginUserName = obj.data.userName;
			
		}
	});
};

/**
 * 详情
 */
var viewBtn = function(btn){
	var userName = getPk(btn);
	var url = "./detailsUser.html?userName=" + userName;
	window.location.href = encodeURI(url);
};


/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var Qu = $("#query_userName").val();
	var Qr = $("#query_realName").val();
	var orgPath = $("#queryOrgPath").val();
	var roleId = $("#query_roleId").val();
	var param = {
			//'page':0,
			//'size':10,
		'userName' : Qu,
		'realName' : Qr,
		'orgPath' : orgPath
		//'roleIds[0]' : roleId
	};
	return param;
};


/**
 * 查询可选角色
 */
var queryRole = function() {
	util.emmAjax({
				url : '../user/findById.action',
				type : 'post',
				
				success : function(data) {
					var userObj = util.str2Json(data);
					if(userObj.success=='true')
					{
						var innerhtml = "";
						for ( var i = 0; i < userObj.data.notOwnerRoles.length; i++) {
							innerhtml += "<option value='"
									+ userObj.data.notOwnerRoles[i][0] + "'>"
									+ userObj.data.notOwnerRoles[i][1]
									+ "</option>";
						}
						$("#multiselect").html(innerhtml);
					}else 
					{
						util.sysAlert(userObj.data);
					}
				}
			});
};

/**
 * 获得增加的参数
 * @return
 */
var getAddParam = function(){
	var orgId = $("#txtAddOrgNum").val();
	var addOrgName = $("#addOrgName").val();
	var addUserName = $("#addUserName").val();
	var addRealName = $("#addRealName").val();
  //  var addPhone = $("#addPhone").val();
    var addMobile = $("#addMobile").val();
	var addPassword2 = $("#addPassword2").val();
	var addPassword1= $("#addPassword1").val();
	var addEmail = $("#addEmail").val();
	var addSex = $("#addSex").val();
	var addUserType = $("#addUserType").val();
	var array = new Array();// 定义数组
	var arrayRoleName=new Array()
	$("#multiselect_to").find("option").each(function(){
		array.push($(this).val());
		arrayRoleName.push($(this).html());
	});
	if(addPassword1!=addPassword2){
		util.sysTips("两次输入密码不一致！","addPassword2");
		return ;
	}
	else if(array.length<=0){
		util.sysTips("请至少选择一种角色！","multiselect");
		return ;
	}
	else if(addSex=='0'){
		util.sysTips("性别不能为空！","addSex");
		return ;
	}
	else if(addUserType=='0'){
		util.sysTips("用户类型不能为空！","addUserType");
		return ;
	}
	else{
		var userType=0;
		var isReplacedFlag=0;
		
		var roleStr="";
		for(var i=0;i<array.length;i++){
			roleStr+='{"roleId":'+array[i]+',"roleName":"'+arrayRoleName[i]+'"},'
		}
		roleStr = roleStr.substring(0, roleStr.length - 1);
		var params={};
		params["approveBean.approveType"] = 'addUser';
		params["approveBean.beanNew"] ='{'+
		'"realName":"'+addRealName+'"'+
		',"userName":"'+addUserName+'"'+
		',"pwd":"'+$.md5(addPassword2)+'"'+
		//',"telephone":"'+addPhone+'"'+
		',"mobilePhone":"'+addMobile+'"'+
		',"email":"'+addEmail+'"'+
		//',"fax":"'+addFax+'"'+
		//',"devManagerFlag":'+userType+
		//',"isReplacedFlag":'+isReplacedFlag+
		//',"orgInfo":{"orgId":"'+OrgId+'","orgName":"'+addOrgName+'"}'+
		',"roleInfos":['+roleStr+']'+
		'}';
		
		var param='{'
		param=param+('\"realName\":\"'+addRealName+ '\",');
		param=param+('\"userName\":\"'+addUserName+ '\",');
		param=param+('\"pwd\":\"'+$.md5(addPassword2)+ '\",');
		param=param+('\"mobilePhone\":\"'+addMobile+ '\",');
		param=param+('\"email\":\"'+addEmail+ '\",');
		param=param+('\"sex\":\"'+addSex+ '\",');
		param=param+('\"userType\":\"'+addUserType+ '\",');
		param=param+('\"orgId\":\"'+orgId+ '\",');
		param=param+('\"orgName\":\"'+addOrgName+ '\",');
		
		var index=0;
		for(var i=0;i<array.length;i++){
			param=param+('\"roleIds['+index+']\":\"'+array[i]+ '\",');
			//param=param+('\"roleInfos['+index+'].roleName\":\"'+arrayRoleName[i]+ '\",');
			index++;
		}
		/*for ( var i = 0; i < nodes.length; i++) {
			if (nodes[i].isParent == false) 
			{
				param=param+('\"authIds['+index+']\":\"'+nodes[i].id+ '\",');
				index++;
			}
		}*/
		param = param.substring(0, param.length - 1);
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
	var orgId = $("#txtAddOrgNum").val();
	var addOrgName = $("#addOrgName").val();
	var addUserName = $("#addUserName").val();
	var addRealName = $("#addRealName").val();
    //var addPhone = $("#addPhone").val();
    var addMobile = $("#addMobile").val();
	var addEmail = $("#addEmail").val();
	var addSex = $("#addSex").val();
	var addUserType = $("#addUserType").val();
	var array = new Array();// 定义数组
	var arrayRoleName=new Array()
	$("#multiselect_to").find("option").each(function(){
		array.push($(this).val());
		arrayRoleName.push($(this).html());
	});
	if(array.length<=0){
		util.sysAlert("请至少选择一种角色！");
		return ;
	}
	else if(addSex=='0'){
		util.sysTips("性别不能为空！","addSex");
		return ;
	}
	else if(addUserType=='0'){
		util.sysTips("用户类型不能为空！","addUserType");
		return ;
	}
	else{
		var userType=0;
		var isReplacedFlag=0;
		
		var roleStr="";
		for(var i=0;i<array.length;i++){
			roleStr+='{"roleId":'+array[i]+',"roleName":"'+arrayRoleName[i]+'"},'
		}
		roleStr = roleStr.substring(0, roleStr.length - 1);
		var params={};
		params["approveBean.approveType"] = 'updateUser';
		params["approveBean.idValue"] = addUserName;
		params["approveBean.beanNew"] ='{'+
		'"realName":"'+addRealName+'"'+
		',"userName":"'+addUserName+'"'+
		//',"telephone":"'+addPhone+'"'+
		',"mobilePhone":"'+addMobile+'"'+
		',"email":"'+addEmail+'"'+
		//',"fax":"'+addFax+'"'+
		//',"devManagerFlag":'+userType+
		//',"isReplacedFlag":'+isReplacedFlag+
		//',"orgInfo":{"orgId":"'+OrgId+'","orgName":"'+addOrgName+'"}'+
		',"roleInfos":['+roleStr+']'+
		'}';
		
		var ownerRoles=update_old_data.ownerRoles;
		var rolesStr_old="";
		/*for(var i=0;i<ownerRoles.length;i++){
			rolesStr_old+='{"roleId":'+ownerRoles[i][0]+',"roleName":"'+ownerRoles[i][1]+'"},'
		}
		rolesStr_old = rolesStr_old.substring(0, rolesStr_old.length - 1);
		*/
		params["approveBean.beanOld"] ='{'+
		'"realName":"'+update_old_data.realName+'"'+
		',"userName":"'+update_old_data.userName+'"'+
		//',"telephone":"'+update_old_data.telephone+'"'+
		',"mobilePhone":"'+update_old_data.mobilePhone+'"'+
		',"email":"'+update_old_data.email+'"'+
		//',"fax":"'+update_old_data.fax+'"'+
		//',"devManagerFlag":'+update_old_data.devManagerFlag+
		//',"isReplacedFlag":'+update_old_data.isReplacedFlag+
		//',"orgInfo":{"orgId":"'+update_old_data.orgId+'","orgName":"'+update_old_data.orgName+'"}'+
		',"roleInfos":['+rolesStr_old+']'+
		'}';
		
		
		var param='{'
			param=param+('\"realName\":\"'+addRealName+ '\",');
			param=param+('\"userName\":\"'+addUserName+ '\",');
			//param=param+('\"pwd\":\"'+$.md5(addPassword2)+ '\",');
			param=param+('\"mobilePhone\":\"'+addMobile+ '\",');
			param=param+('\"email\":\"'+addEmail+ '\",');
			param=param+('\"sex\":\"'+addSex+ '\",');
			param=param+('\"userType\":\"'+addUserType+ '\",');
			param=param+('\"orgId\":\"'+orgId+ '\",');
			param=param+('\"orgName\":\"'+addOrgName+ '\",');
			
			var index=0;
			/*for(var i=0;i<ownerRoles.length;i++){
				param=param+('\"roleIds['+index+']\":\"'+ownerRoles[i][0]+ '\",');
				//param=param+('\"roleInfos['+index+'].roleName\":\"'+ownerRoles[i][1]+ '\",');
				index++;
			}*/
			
			for(var i=0;i<array.length;i++){
				param=param+('\"roleIds['+index+']\":\"'+array[i]+ '\",');
				index++;
			}
			param = param.substring(0, param.length - 1);
			param += '}';
			param=str2Json(param);
				
		store_new['orgNum']=orgId;
		store_new['realName']=addRealName;
		//store_new['phone']=addPhone;
		store_new['mobile']=addMobile;
		store_new['email']=addEmail;
		store_new['sex']=addSex;
		store_new['userType']=addUserType;
		store_new['roles']=array;
		return param;
	}
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
	$("#txtAddOrgNum").val(object.orgId);
	$("#addOrgName").val(object.orgName);
	$("#addUserName").val(object.userName);
	$("#addRealName").val(object.realName);
	//$("#addPhone").val(object.telephone);
	$("#addMobile").val(object.mobilePhone);
	
	$("#addEmail").val(object.email);
	$("#addSex").val(object.sex);
	$("#addUserType").val(object.userType);
	
	var innerhtml = "";
	for ( var i = 0; i < object.notOwnerRoles.length; i++) {
		innerhtml += "<option value='"
				+ object.notOwnerRoles[i][0] + "'>"
				+ object.notOwnerRoles[i][1]
				+ "</option>";
	}
	$("#multiselect").html(innerhtml);
	
	var owerRoleshtml = "";
	for ( var i = 0; i < object.ownerRoles.length; i++) {
		roles.push(object.ownerRoles[i][0]);
		owerRoleshtml += "<option value='"
				+ object.ownerRoles[i][0] + "'>"
				+ object.ownerRoles[i][1]
				+ "</option>";
	}
	$("#multiselect_to").html(owerRoleshtml);
	
	store_old['orgNum']=object.orgId;
	store_old['realName']=object.realName;
	//store_old['phone']=object.telephone;
	store_old['mobile']=object.mobilePhone;
	store_old['email']=object.email;
	store_old['sex']=object.sex;
	store_old['userType']=object.userType;
	store_old['roles']=roles;
};

//重置密码
var rePwdFun = function(btn) {
	util.confirmView(function(){
		var pk = getPk(btn);
		var userName = pk;
		util.emmAjax({
			url : '../user/resetPassword.action',
			data : {
				'userName' : userName
			},
			success : function(data) {
				var obj =str2Json(data);
				if(obj.success=='true')
				{
					util.msg("密码重置成功");
					if(loginUserName==userName){
						setTimeout(function(){parent.location.href="../login.html";},1000);
						
					}else{
						$("#table").trigger("reloadGrid");
					}
				}
				else{
					util.sysAlert(obj.data);
				}
			}
		});
	},"确定要重置该用户的密码？");
};

var downloadUserModel=function(){
	window.location.href ="../importData/downloadUserModel.action";
};

function UpLoadExcel(){
	//检验导入的文件是否为Excel文件  
	  var excelPath = document.getElementById("fileToUpload").value;  
	   if(excelPath == null || excelPath == ''){  
		   util.msg("请选择要上传的Excel文件");  
		   return false;  
	    }else{  
	        var fileExtend = excelPath.substring(excelPath.lastIndexOf('.')).toLowerCase();   
		    if(fileExtend == '.xls'||fileExtend == '.xlsx'){ 
		    	 //document.getElementById("upload_form").submit();
		    	 /*util.loading();*/
		    	return true;
	        }else{  
	        	util.msg("文件格式需为'.xls'或‘.xlsx’格式"); 
		            return false;  
		     } 
		 }
	  
};

var loadRole_query = function(){
	var param=[];
	var selectObj = {};
	selectObj["url"] = "../role/queryRoleInfo.action";
	selectObj["id"] = 'query_roleId';
	selectObj["param"] = param;
	selectObj["valueParam"] = 'roleId';
	selectObj["htmlParam"] = 'roleName';
	selectObj["defaultSelectedValue"] = null;
	
	var selectOption = new SelectOption();
	selectOption.clear('query_roleId');
	selectOption.loadOption(selectObj);
};

/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};
